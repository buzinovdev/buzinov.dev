<template>
  <div class="page-email">
    <div class="contacts">
      <div class="illustration">
        <img class="illustration-picture" src="~/assets/images/emailFigure.svg">
      </div>
      <div class="info">
        <div class="me">Бузинов Андрей</div>
        <button class="email" title="Скопировать почтовый адрес"
                @click="copyToClipboard('Почтовый адрес скопирован в буфер обмена','buzinov.dev@yandex.ru')">
          <img src="~assets/icons/email.svg" alt="" v-svg>
          <span>buzinov.dev@yandex.ru</span>
        </button>
      </div>
      <div class="flex align-center contacts-link">
        <ul class="social">
<!--          <li class="social-item" v-for="(item, idx) in social" :key="idx">
            <a :href="item.link" :title="item.title" target="_blank">
              <img class="social-icon" :src="require(`~/assets/icons/${item.icon}`)" :alt="item.title"/>
            </a>
          </li>-->
          <li class="social-item">
            <button class="share" @click="copyToClipboard('Ссылка скопирована в буфер обмена',store.mainUrl)"
                    title="Поделиться сайтом">
              <span>Поделиться</span>
              <img class="social-icon" :src="require(`~/assets/icons/share.svg`)" alt="Поделиться"/>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="connection">
      <h1>Свяжитесь со мной</h1>
      <form class="form" @submit.prevent>
        <Field label="Ваше имя" v-model:value="name"/>
        <Field label="Email" type="email" v-model:value="email"/>
        <Checkbox label="Виды услуг" v-model:value="services" :items="servicesList" v-if="false"/>
        <Field label="Тема письма" v-model:value="subject"/>
        <Field label="Cообщение" :text="true" v-model:value="message"/>
        <ControlsBtn text="Отправить" :disabled="checkedForm" @click="sendMessage"/>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Field from '@/components/forms/Field'
import Checkbox from '@/components/forms/Checkbox'
import { useStore } from '@/store'
const store = useStore()

interface ServicesList {
  label: string
  value: string
}

interface SocialLinks {
  title: string
  link: string
  icon: string
}

const servicesList: ServicesList[] = [
  {label: 'Разработка сайта', value: 'site'},
  {label: 'Разработка дизайна', value: 'design'},
  {label: 'SEO оптимизация', value: 'seo'}
]

//const {data: social} = useFetch(`${store.apiLink}site/getSocial`)
const socialLinks: SocialLinks[] = [
/*
{title: 'Вконтакте', link: 'https://vk.com/buzinovdev', icon: 'vk.svg'},
  {title: 'Telegram', link: 'https://t.me/benandy97', icon: 'telegram.svg'},
  {
    title: 'WhatsApp',
    link: 'https://wa.me/79858093717?text=Buzinov.dev%20-%20web%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA',
    icon: 'whatsapp.svg'
  }
  */
]

const name = ref<string>('')
const subject = ref<string>('')
const email = ref<string>('')
const services = ref<string[]>([])
const message = ref<string>('')
const copyToClipboard = (text: string, content: string): void => {
  navigator.clipboard.writeText(content)
      .then(() => {
        store.setNotify({text, type: 'success', active: true})
      })
      .catch(err => {
        store.setNotify({text: 'Произошла ошибка', type: 'danger', active: true})
      });
}

const checkedForm = computed<boolean>(() => {
  return !(name.value.length > 0 && email.value.length > 0 && message.value.length > 0)
})
const sendMessage = async () => {
  await $fetch(`${store.apiLink}mailer/contact`, {
    method: 'POST',
    body: {
      name: name.value.trim(),
      subject: subject.value.trim(),
      email: email.value.trim(),
      message: message.value.trim()
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    name.value = ''
    subject.value = ''
    email.value = ''
    message.value = ''
  }).catch(e => console.log(e))
}
useHead({
  title: 'Связаться со мной',
  meta: [
    {name: 'description', content: 'Перейдите в мои социальные сети или отправьте сообщение на мою рабочую почту'}
  ]
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

@mixin anim {
  animation: anim 2s 1s forwards;
  opacity: 0;
  transform: scale(.5);
}

.page-email {
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.contacts {
  width: 40%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include anim;

  &-link {
    margin-top: 3rem;
  }
}

.illustration {
  display: flex;

  &-picture {
    max-width: 400px;
  }
}

.info {
  margin-top: 2rem;

  .me {
    font-size: 2.5em;
    font-family: $font-second;
    color: $light-color;
  }
}

.email {
  background-color: transparent;
  border: none;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  color: $light-color;

  span {
    margin-left: 14px;
  }
}

.social {
  display: flex;

  &-item {
    display: block;
    transition: transform $transition;
    margin-right: 20px;
  }
}

.share {
  border: none;
  background-color: $light-color;
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 0 14px;
  font-size: 14px;
  color: $purple;

  span {
    margin-right: 5px;
  }
}

.connection {
  width: 40%;
  margin: 0 5%;
  @include anim;
  animation-delay: 1.2s;

  h1 {
    font-size: 2em;
    text-align: center;
    margin-bottom: 2rem;
    font-family: $font-third;
    color: $light-color;
  }
}

@media screen and (min-width: 1024px) {
  .social-item:hover {
    transform: scale(1.1);
  }
}

@media screen and (max-width: 1024px) {
  .connection,
  .contacts {
    width: 100%;
  }
  .connection {
    margin-bottom: 4rem;
    animation-delay: 1s;
  }
  .contacts {
    margin: 0 auto;
    animation-delay: 1.5s;
  }
}
@media screen and (max-width: 420px) {
  .illustration-picture {
    max-width: 320px;
  }
}
@keyframes anim {
  0% {
    opacity: 0;
    transform: scale(.5);

  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>