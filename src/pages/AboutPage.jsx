import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ChefHat, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './PrivacyPolicyPage.css'; // Reusing the same CSS for consistency

const AboutPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="privacy-page">
            <header className="privacy-header">
                <button className="icon-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Sobre Nós</h1>
            </header>

            <div className="privacy-content">
                <section className="mission-section">
                    <div className="icon-header">
                        <Heart className="section-icon" size={32} color="#E91E63" />
                        <h2>Nossa Missão</h2>
                    </div>
                    <p>
                        No <strong>Receitas para Casal</strong>, acreditamos que cozinhar juntos é uma das formas mais puras de conexão.
                        Nossa missão é transformar a cozinha em um espaço de romance, diversão e memórias duradouras.
                        Não somos apenas um aplicativo de receitas; somos um facilitador de momentos especiais.
                    </p>
                    <p>
                        Em um mundo cada vez mais digital e acelerado, reservar um tempo para preparar uma refeição a dois
                        é um ato de amor. Queremos inspirar casais a desligarem as telas (exceto a nossa, claro!) e
                        se conectarem através dos sabores, aromas e da colaboração no preparo de pratos incríveis.
                    </p>
                </section>

                <section className="story-section">
                    <div className="icon-header">
                        <ChefHat className="section-icon" size={32} color="#E91E63" />
                        <h2>Por que Cozinhar a Dois?</h2>
                    </div>
                    <p>
                        Estudos mostram que casais que dividem tarefas domésticas e atividades de lazer têm relacionamentos mais fortes e satisfatórios.
                        Cozinhar envolve comunicação, trabalho em equipe e criatividade. É uma dança na cozinha onde cada um tem seu papel,
                        mas o resultado é compartilhado.
                    </p>
                    <p>
                        Além disso, cozinhar em casa é mais saudável e econômico. Permite que vocês escolham os melhores ingredientes,
                        controlem o sal e o açúcar, e descubram novos favoritos juntos. É uma aventura gastronômica sem sair de casa.
                    </p>
                </section>

                <section className="features-highlight">
                    <div className="icon-header">
                        <Award className="section-icon" size={32} color="#E91E63" />
                        <h2>O Que Nos Torna Únicos</h2>
                    </div>
                    <ul>
                        <li>
                            <strong>Foco em Casais:</strong> Todas as nossas sugestões e funcionalidades são pensadas para duas pessoas.
                        </li>
                        <li>
                            <strong>Memórias Multimídia:</strong> Diferente de outros apps, permitimos que você salve fotos e vídeos do preparo.
                            Aquela guerra de farinha ou o brinde com vinho merecem ser lembrados!
                        </li>
                        <li>
                            <strong>Privacidade Total:</strong> Seus dados, receitas e memórias ficam salvos no seu dispositivo.
                            Respeitamos sua intimidade e não compartilhamos suas informações.
                        </li>
                        <li>
                            <strong>Calculadora de Custos (Em Breve):</strong> Para casais empreendedores, estamos desenvolvendo ferramentas
                            para ajudar a calcular custos de receitas e até lucrar com seus dotes culinários.
                        </li>
                    </ul>
                </section>

                <section className="contact-section">
                    <h2>Entre em Contato</h2>
                    <p>
                        Adoramos ouvir histórias de nossos usuários! Se você tem uma sugestão de receita, encontrou um bug ou apenas quer
                        compartilhar como o app ajudou no seu relacionamento, entre em contato conosco.
                    </p>
                    <p>Email: contato@receitasparacasal.com.br</p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
