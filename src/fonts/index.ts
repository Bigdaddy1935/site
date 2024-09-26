import localFont from 'next/font/local'

export const siteFont = localFont({
    src : [
            {
                path: './IRANSansWeb_Bold.woff',
                weight: '700',
            },
            {
                path: './IRANSansWeb_Medium.woff',
                weight: '500',
            },
            {
                path: './IRANSansWeb.woff',
                weight: '400',
            },
            {
                path: './IRANSansWeb_Light.woff',
                weight: '300',
            },
            {
                path: './IRANSansWeb_UltraLight.woff',
                weight: '200',
            },
    ],
    variable : '--site-font'
})