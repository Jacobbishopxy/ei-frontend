import { Settings as LayoutSettings } from '@ant-design/pro-layout'

export default {
  navTheme: 'light',
  primaryColor: '#722ED1',
  headerHeight: 40,
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
    // defaultOpenAll: true
  },
  title: 'InforeCapital',
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean
}
