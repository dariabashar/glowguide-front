import ReactGA from 'react-ga4'

const MEASUREMENT_ID = 'G-XG6TCTJ3B6' 

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID)
}

export const track = (action: string, category = 'General', label?: string) => {
  ReactGA.event({ category, action, label })
}

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path })
}
