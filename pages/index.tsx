import { useRouter } from 'next/router'
import { Texts } from '../src/constants/Texts'
import useI18n from '../src/lib/hooks/useI18n'
import useUser from '../src/lib/hooks/useUser'

export const Home = () => {
  const router = useRouter()
  const { changeLanguage, i18n, locale } = useI18n()
  const { getUser } = useUser()

  const { email, roles } = getUser()
  return (
    <div>{`${Texts.homeWelcome} ${email}`}</div>
    // <Fragment>
    //   <Toolbar className="flex justify-between my-2 mx-1">
    //     <div>
    //       <HeaderButton onClick={() => router.push('/')} size="small">
    //         Anatoly Kehl
    //       </HeaderButton>
    //     </div>
    //     <div className="flex justify-between">
    //       <HeaderButton size="small" onClick={() => router.push('/about')}>
    //         {i18n.about}
    //       </HeaderButton>
    //       <Dropdown
    //         buttonLabel={i18n.gallery}
    //         menuItems={CATEGORIES.map((category) => ({
    //           name: category,
    //           onClick: () => router.push(`/gallery/${category}`),
    //         }))}
    //       />
    //       <Dropdown
    //         buttonLabel={locale || ''}
    //         menuItems={['en', 'de', 'ru'].map((oneLocale) => ({
    //           name: oneLocale.toUpperCase(),
    //           onClick: () => changeLanguage(oneLocale),
    //         }))}
    //       />
    //       <UserPanel />
    //     </div>
    //   </Toolbar>
    // </Fragment>
  )
}

export default Home
