import Script from 'next/script'
import useConnectedAccount from '../../../hooks/useConnectedAccount'

export const Intercom = () => {
  const { web3AuthUserInfo } = useConnectedAccount()

  return (
    <>
      <Script id='intercom'>{`
        window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "k6jidofs",
        name: ${web3AuthUserInfo?.name || ''},
        email: ${web3AuthUserInfo?.email || ''}, 
       };
    `}</Script>
      <Script id='intercom-widget'>{`
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/k6jidofs';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    `}</Script>
    </>
  )
}
