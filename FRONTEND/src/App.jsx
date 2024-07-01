import { createBrowserRouter , RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import HomePage from "./pages/homePage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegisterationPage"
import { UserProvider } from "./pages/userProvider"
import UserGeneratePage from "./pages/UserGeneratePage"



function App() {
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = {<RootLayout />} >
        <Route path ='/' element ={<HomePage />} />
        <Route path = 'about' element = { <AboutPage />} />
        <Route path = 'login' element = { <LoginPage />} />
        <Route path = 'register' element = { <RegistrationPage />} />
        <Route path = 'userURL' element = {<UserGeneratePage/>}/>


      </Route>
    )
  )


  return ( 
    <UserProvider>
    <RouterProvider router={router} />
  </UserProvider> 
)
}

export default App
