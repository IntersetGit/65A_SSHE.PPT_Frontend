import { useRouter } from "next/router"

/**
 * Function นี้เป็น Function ที่ใช้งานร่วมกับ Loyout 
 * เป็น Function ที่เช็ค Router.pathname ว่าไม่ต้องการ จะใช้ Layout หน้าไหนบ้าง
 * วิธีใช้ ให้นำ ชื่อ path ที่ไม้ต้องการจะใช้ Layout ไปใส่ใน Array ชื่อที่ชื่อว่า Exclude = []
 */

const Exclude = [
  '/login',
  '/_error'
]

const LayoutExcluder = () => {
  const router = useRouter()
  
  const isFound = Exclude.find( e => e === router.pathname )

  return isFound ? false : true
}

export default LayoutExcluder