import Script from 'next/script'
import { useTranslation } from 'react-i18next'

export const PipeDrive = () => {
  const { i18n } = useTranslation(['common'])

  const language = i18n.language === 'pt' ? 'pt-BR' : 'en-EN'

  return (
    <>
      {language === 'pt-BR' ? (
        <Script
          id='pipedrive-pt'
          strategy='afterInteractive'
        >{`window.pipedriveLeadboosterConfig = {base: 'leadbooster-chat.pipedrive.com',companyId: 13409892,playbookUuid: '4cbac8f3-bdb3-4b13-a82f-a4e57c0325e7',version: 2};(function () {var w = window;if (w.LeadBooster) {console.warn('LeadBooster already exists');} else {w.LeadBooster = {q: [],on: function (n, h) {this.q.push({ t: 'o', n: n, h: h });},trigger: function (n) {this.q.push({ t: 't', n: n });},};}})();`}</Script>
      ) : (
        <Script
          id='pipedrive-en'
          strategy='afterInteractive'
        >{`window.pipedriveLeadboosterConfig = {base: 'leadbooster-chat.pipedrive.com',companyId: 13409892,playbookUuid: 'abda8bca-bdb6-4e0d-8279-d6bf67e244c1',version: 2};(function () {var w = window;if (w.LeadBooster) {console.warn('LeadBooster already exists');} else {w.LeadBooster = {q: [],on: function (n, h) {this.q.push({ t: 'o', n: n, h: h });},trigger: function (n) {this.q.push({ t: 't', n: n });},};}})();`}</Script>
      )}
      <Script id='pipedrive-base' strategy='afterInteractive' src='https://leadbooster-chat.pipedrive.com/assets/loader.js' async></Script>
      <Script id='pipedrive-feed' strategy='afterInteractive'>
        {`(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('DzLR5a55pLWaBoQ2');`}{' '}
      </Script>
    </>
  )
}
