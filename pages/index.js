import { isUserLoggedin } from "../utils/authenticate/utils"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Config from "../config";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    if (isUserLoggedin()) {
      router.push(Config.DEFAULT_REDIRECT_PATH)
    }else{
      router.push(Config.NO_AUTH_PAGE)
    }
  })

  return (<> </>)
}
