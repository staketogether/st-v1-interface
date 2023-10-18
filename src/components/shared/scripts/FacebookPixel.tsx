import Script from 'next/script'
import styled from 'styled-components'

export const FacebookPixel = () => {
  return (
    <>
      <Script
        id='facebook-pixel'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1367668057155824');
        fbq('track', 'PageView');
      `
        }}
      />
      <noscript>
        <PixelImage
          height='1'
          width='1'
          style={{ display: 'none', height: 1, width: 1 }}
          src='https://www.facebook.com/tr?id=1367668057155824&ev=PageView&noscript=1'
        />
      </noscript>
    </>
  )
}

const { PixelImage } = {
  PixelImage: styled.img``
}
