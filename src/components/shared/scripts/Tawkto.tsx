import Script from 'next/script'

export const TawkTo = () => {
  return (
    <Script id='tawkto' strategy='afterInteractive'>
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/647e6b7294cf5d49dc5bfb7f/1h26t7ebk';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        `}
    </Script>
  )
}
