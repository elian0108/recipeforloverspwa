import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './PrivacyPolicyPage.css'; // Reusing the same CSS for consistency

const TermsPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="privacy-page">
            <header className="privacy-header">
                <button className="icon-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Termos de Uso</h1>
            </header>

            <div className="privacy-content">
                <p className="last-update">Última atualização: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2>1. Aceitação dos Termos</h2>
                    <p>
                        Ao baixar, instalar ou usar o aplicativo <strong>Receitas para Casal</strong>, você concorda em cumprir estes Termos de Uso.
                        Se você não concordar com algum destes termos, por favor, não use o aplicativo.
                    </p>
                </section>

                <section>
                    <h2>2. Uso do Aplicativo</h2>
                    <p>
                        O <strong>Receitas para Casal</strong> é um aplicativo destinado ao uso pessoal e não comercial.
                        Você concorda em usar o aplicativo apenas para fins legais e de acordo com estes termos.
                    </p>
                    <p>
                        É proibido usar o aplicativo para distribuir conteúdo ofensivo, ilegal ou que viole direitos de terceiros.
                    </p>
                </section>

                <section>
                    <h2>3. Conteúdo do Usuário</h2>
                    <p>
                        O aplicativo permite que você crie, armazene e compartilhe receitas, fotos e vídeos ("Conteúdo do Usuário").
                        Você mantém todos os direitos sobre seu Conteúdo do Usuário. No entanto, ao salvar conteúdo no aplicativo,
                        você garante que possui os direitos necessários para fazê-lo.
                    </p>
                    <p>
                        O aplicativo funciona principalmente offline e armazena dados localmente no seu dispositivo.
                        Nós não temos acesso ao seu Conteúdo do Usuário e não somos responsáveis pela perda de dados decorrente
                        de falhas no dispositivo ou desinstalação do aplicativo.
                    </p>
                </section>

                <section>
                    <h2>4. Propriedade Intelectual</h2>
                    <p>
                        O design do aplicativo, logotipos, textos (excluindo Conteúdo do Usuário) e código-fonte são de propriedade exclusiva
                        de seus desenvolvedores e estão protegidos por leis de direitos autorais e propriedade intelectual.
                    </p>
                </section>

                <section>
                    <h2>5. Isenção de Garantias</h2>
                    <p>
                        O aplicativo é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas.
                        Não garantimos que o aplicativo estará livre de erros ou que funcionará ininterruptamente.
                    </p>
                </section>

                <section>
                    <h2>6. Limitação de Responsabilidade</h2>
                    <p>
                        Em nenhuma circunstância os desenvolvedores do <strong>Receitas para Casal</strong> serão responsáveis por quaisquer danos diretos,
                        indiretos, incidentais ou consequentes decorrentes do uso ou da incapacidade de usar o aplicativo.
                    </p>
                </section>

                <section>
                    <h2>7. Alterações nos Termos</h2>
                    <p>
                        Podemos atualizar estes Termos de Uso periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações.
                        O uso contínuo do aplicativo após a publicação de alterações constitui aceitação dos novos termos.
                    </p>
                </section>

                <section>
                    <h2>8. Contato</h2>
                    <p>
                        Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: contato@receitasparacasal.com.br
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
