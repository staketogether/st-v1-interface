import Script from 'next/script'

export const TawkTo = () => {
  return (
    <Script id='tawkto' strategy='afterInteractive'>
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/647df75acc26a871b020bf45/1h260seqk';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        `}
    </Script>
  )
}
