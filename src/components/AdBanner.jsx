import { useEffect, useRef } from 'react';

/**
 * Componente de anúncio AdSense responsivo.
 * Renderiza um bloco <ins> e chama adsbygoogle.push() uma vez por montagem.
 */
const AdBanner = () => {
    const adRef = useRef(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;
        try {
            if (adRef.current && adRef.current.offsetWidth > 0) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                pushed.current = true;
            }
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', margin: '24px auto', maxWidth: '100%', overflow: 'hidden' }}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2519620943582648"
                data-ad-slot="9539776493"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdBanner;
