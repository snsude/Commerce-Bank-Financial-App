-- PostgreSQL Schema Creation Script
-- Creates the Clarifi database structure without sample data

-- Create schema
CREATE SCHEMA IF NOT EXISTS test;

-- Create tables
CREATE TABLE public.roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    permission_level VARCHAR(20) NOT NULL,
    description TEXT
);
COMMENT ON TABLE public.roles IS 'Simplified role definitions with permission levels';

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id INTEGER NOT NULL REFERENCES public.roles(id),
    business_id INTEGER,
    admin_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE public.users IS 'User accounts with role-based access control';

CREATE TABLE public.authcredentials (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    password_algo VARCHAR(50) NOT NULL,
    password_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    failed_attempts INTEGER DEFAULT 0,
    last_failed_at TIMESTAMP,
    last_login TIMESTAMP
);
COMMENT ON TABLE public.authcredentials IS 'User authentication credentials and login history';

CREATE TABLE public.profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    display_name VARCHAR(100),
    age INTEGER,
    gender VARCHAR(20),
    occupation VARCHAR(100),
    is_business BOOLEAN DEFAULT false,
    business_name VARCHAR(100)
);
COMMENT ON TABLE public.profiles IS 'User profiles with personal and business information';

CREATE TABLE public.businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES public.users(id)
);
COMMENT ON TABLE public.businesses IS 'Business entities for business users';

CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    kind VARCHAR(20) NOT NULL,
    parent_id INTEGER REFERENCES public.categories(id) ON DELETE SET NULL,
    CONSTRAINT categories_kind_check CHECK (kind IN ('income', 'expense'))
);
COMMENT ON TABLE public.categories IS 'Income and expense categories with hierarchical support';

CREATE TABLE public.budgets (
    id SERIAL PRIMARY KEY,
    budget_id VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    month DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE public.budgets IS 'User budget definitions by month';

CREATE TABLE public.budgetentries (
    id SERIAL PRIMARY KEY,
    budget_id INTEGER NOT NULL REFERENCES public.budgets(id),
    category_id INTEGER NOT NULL REFERENCES public.categories(id),
    planned NUMERIC(10,2) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    CONSTRAINT budgetentries_planned_check CHECK (planned >= 0)
);
COMMENT ON TABLE public.budgetentries IS 'Individual budget line items';

CREATE TABLE public.transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    category_id INTEGER REFERENCES public.categories(id),
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE public.transactions IS 'User financial transactions';

CREATE TABLE public.goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20),
    target_amount NUMERIC(10,2) NOT NULL,
    current_amount NUMERIC(10,2) DEFAULT 0,
    target_date DATE,
    status VARCHAR(20) DEFAULT 'on track',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT goals_current_amount_check CHECK (current_amount >= 0),
    CONSTRAINT goals_target_amount_check CHECK (target_amount > 0),
    CONSTRAINT goals_type_check CHECK (type IN ('savings', 'debt_paydown'))
);
COMMENT ON TABLE public.goals IS 'User financial goals and progress tracking';

CREATE TABLE public.llmlogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    session_id VARCHAR(100),
    prompt TEXT,
    response TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE public.llmlogs IS 'LLM interaction logs for user sessions';

-- Create function
CREATE OR REPLACE FUNCTION public.can_modify_financial_data(user_id INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.users u
        JOIN public.roles r ON u.role_id = r.id
        WHERE u.id = user_id 
        AND r.permission_level = 'read_write'
    );
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION public.can_modify_financial_data(user_id INTEGER) IS 'Check if user has write permissions for financial data';

-- Create views
CREATE VIEW public.llm_budget_overview AS
SELECT 
    b.user_id,
    b.month,
    c.name AS category_name,
    c.kind AS category_kind,
    be.planned AS budgeted_amount,
    COALESCE(SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END), 0) AS actual_expenses,
    COALESCE(SUM(CASE WHEN t.amount >= 0 THEN t.amount ELSE 0 END), 0) AS actual_income
FROM public.budgets b
JOIN public.budgetentries be ON b.id = be.budget_id
JOIN public.categories c ON be.category_id = c.id
LEFT JOIN public.transactions t ON (
    t.user_id = b.user_id 
    AND t.category_id = c.id 
    AND EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM b.month)
    AND EXTRACT(YEAR FROM t.created_at) = EXTRACT(YEAR FROM b.month)
)
GROUP BY b.user_id, b.month, c.name, c.kind, be.planned;

CREATE VIEW public.llm_transaction_summary AS
SELECT 
    t.user_id,
    t.id AS transaction_id,
    t.amount,
    ABS(t.amount) AS absolute_amount,
    c.name AS category_name,
    c.kind AS category_kind,
    t.created_at,
    EXTRACT(MONTH FROM t.created_at) AS month,
    EXTRACT(YEAR FROM t.created_at) AS year
FROM public.transactions t
JOIN public.categories c ON t.category_id = c.id;

CREATE VIEW public.llm_business_hierarchy AS
SELECT 
    u.id AS user_id,
    u.email,
    p.display_name,
    r.role_name,
    p.business_name,
    u.admin_email,
    admin_user.email AS admin_user_email,
    admin_profile.display_name AS admin_display_name
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
LEFT JOIN public.roles r ON u.role_id = r.id
LEFT JOIN public.users admin_user ON u.admin_email = admin_user.email
LEFT JOIN public.profiles admin_profile ON admin_user.id = admin_profile.user_id
WHERE r.role_name IN ('business_admin', 'business_subuser');

CREATE VIEW public.llm_financial_overview AS
SELECT 
    'transaction' AS data_source,
    t.user_id,
    NULL::DATE AS month,
    c.name AS category_name,
    c.kind AS category_kind,
    NULL::NUMERIC AS budgeted_amount,
    CASE WHEN c.kind = 'income' THEN ABS(t.amount) ELSE 0 END AS actual_income,
    CASE WHEN c.kind = 'expense' THEN ABS(t.amount) ELSE 0 END AS actual_expenses,
    t.amount,
    ABS(t.amount) AS absolute_amount,
    t.created_at AS date
FROM public.transactions t
JOIN public.categories c ON t.category_id = c.id
UNION ALL
SELECT 
    'budget' AS data_source,
    b.user_id,
    b.month,
    c.name AS category_name,
    c.kind AS category_kind,
    be.planned AS budgeted_amount,
    bov.actual_income,
    bov.actual_expenses,
    NULL::NUMERIC AS amount,
    NULL::NUMERIC AS absolute_amount,
    b.month AS date
FROM public.budgets b
JOIN public.budgetentries be ON b.id = be.budget_id
JOIN public.categories c ON be.category_id = c.id
LEFT JOIN public.llm_budget_overview bov ON (
    bov.user_id = b.user_id 
    AND bov.month = b.month 
    AND bov.category_name = c.name
);

CREATE VIEW public.llm_goal_progress AS
SELECT 
    user_id,
    name AS goal_name,
    type AS goal_type,
    current_amount,
    target_amount,
    (current_amount / target_amount) * 100 AS progress_percentage,
    target_date,
    status
FROM public.goals;

CREATE VIEW public.llm_user_profile AS
SELECT 
    u.id AS user_id,
    p.display_name,
    p.age,
    p.gender,
    p.occupation,
    r.role_name,
    r.permission_level,
    p.is_business,
    COALESCE(b.name, p.business_name) AS business_name,
    a.last_login
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
LEFT JOIN public.roles r ON u.role_id = r.id
LEFT JOIN public.authcredentials a ON u.id = a.user_id
LEFT JOIN public.businesses b ON u.business_id = b.id;

-- Add foreign key constraints
ALTER TABLE public.users 
ADD CONSTRAINT users_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
ADD CONSTRAINT users_admin_email_fkey FOREIGN KEY (admin_email) REFERENCES public.users(email);

ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);