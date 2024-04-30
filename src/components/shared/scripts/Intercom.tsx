import Script from 'next/script'
import { useTranslation } from 'react-i18next'

export const Intercom = () => {
  const { i18n } = useTranslation(['common'])

  const language = i18n.language === 'pt' ? 'pt' : 'en'

  return (
    <Script id='intercom-widget' strategy='afterInteractive'>{`
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/k6jidofs';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "k6jidofs",
        language_override: "${language}"
      });
    `}</Script>
  )
}
