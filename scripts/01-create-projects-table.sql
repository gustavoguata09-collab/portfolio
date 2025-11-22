-- Drop table if exists (para recriar limpo)
DROP TABLE IF EXISTS projects;

-- Criar tabela de projetos
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  project_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir projetos iniciais
INSERT INTO projects (title, description, image_url, project_url) VALUES
('Web Contabilidade', 'Sistema completo de gestão contábil desenvolvido com React e Node.js. Inclui controle de clientes, emissão de notas fiscais e relatórios financeiros.', '/contabilidade.png', 'https://kvkcontabeis.com.br/?utm_source=ig&utm_medium=social&utm_content=link_in_bio'),
('E-commerce Açaí', 'Plataforma de e-commerce para delivery de açaí com sistema de pedidos em tempo real, integração com pagamento e painel administrativo.', '/vibrant-acai-bowl.png', 'https://github.com/gustavoguata09');
