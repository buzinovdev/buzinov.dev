// @ts-ignore
import {defineStore} from 'pinia'
export const useStore = defineStore({
  id: 'main',
  state: () => ({
    mainUrl: process.env.NODE_ENV === 'development'?'http://localhost:3000' : 'https://buzinov.dev',
    api: '/api/',
    loadData: false,
    showMenu: false,
    accessToken: null as string | null,
    appStyle: [
      'linear-gradient(to right, #0f0c29, #252050, #24243e)',
      'linear-gradient( 112.1deg,  rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2% )',
      'linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )',
      'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      'linear-gradient(90deg, #567599, #1f2e4b)',
      'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
      'linear-gradient(90deg,#2e2e2e,#e0453f)',
    ],
    currentAppStyle: 'linear-gradient(to right, #0f0c29, #252050, #24243e)',
    navigation: [
      {title: 'Главная', link: '/', name: '', description: 'WEB разработчик'},
      {title: 'Обо мне', link: '/about', name: 'about', description: 'Подробнее обо мне и моих навыках'},
      {title: 'Проекты', link: '/projects', name: 'projects', description: 'Мои проекты начатые и завершенные'},
      //{title: 'Услуги', link: '/service', name: 'services', description: 'Предостовляемые услуги'},
      {
        title: 'Контакты',
        link: '/contacts',
        name: 'contacts',
        description: 'Свяжитесь со мной'
      }
    ],
    startDev: new Date(new Date().getTime() - new Date('2020/11/01').getTime()).getFullYear() - 1970,
    services: [
      {title: 'Разработка сайта', price: 'от 50000 руб.', icon: 'site-icon.svg'},
      {title: 'Модернизация сайта', price: 'от 25000 руб.', icon: 'update-icon.svg'},
      /*{title: 'Продвижение сайта', price: 'от 20000 руб. в месяц', icon: 'seo-icon.svg'},*/
      {title: 'Веб-приложение', price: 'от 100000 руб.', icon: 'app-icon.svg'},
      {title: 'Аудит сайта', price: 'от 25000 руб.', icon: 'analytic-icon.svg'},
      {title: 'Ускорение сайта', price: 'от 25000 руб.', icon: 'boost-icon.svg'},
    ],
    projects: [],
    notification: {text: '', type: '', active: false},
    devStack: ['Vue/Nuxt js', 'в связке с TypeScript']
  }),

  getters: {
    apiLink: state => state.mainUrl + state.api,
    token: state => state.accessToken,
    isShowMenu: state => state.showMenu,
    navigationList: state => state.navigation,
    servicesList: state => state.services,
    projectsList: state => state.projects,
    styleList: state => state.appStyle,
    style: state => state.currentAppStyle,
    notify: state => state.notification
  },

  actions: {
    setToken(token: string | null) {
      this.accessToken = token
    },
    removeToken() {
      this.accessToken = null
    },
    showMenuAction(action: boolean) {
      this.showMenu = action
    },
    changeAppStyle(style: string) {
      this.currentAppStyle = style
    },
    setNotify(notification: { text: string, type: string, active: boolean }) {
      this.notification = notification
    },
    async getProjects() {
      this.projects = await $fetch(`${this.apiLink}projects/getProjects`)
    }
  }
})