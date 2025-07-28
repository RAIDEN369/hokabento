'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    gtag: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

interface GTMProps {
  gtmId?: string
  ga4Id?: string
}

export function GTM({ gtmId, ga4Id }: GTMProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && ga4Id) {
      window.gtag = window.gtag || function (...args: unknown[]) {
        window.gtag.q = window.gtag.q || []
        window.gtag.q.push(args)
      }
    }
  }, [ga4Id])

  if (!gtmId && !ga4Id) return null

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
            }}
          />
        </>
      )}
    </>
  )
}

export function GTMNoScript({ gtmId }: { gtmId?: string }) {
  if (!gtmId) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}