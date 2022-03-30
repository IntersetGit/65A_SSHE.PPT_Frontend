import { isUserLoggedin } from "../utils/authenticate/utils"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    if (isUserLoggedin()) {
      router.push('/backoffice/contractor_company_mange')
    }else{
      router.push('/login')
    }
  })

  return (<> </>)
}
