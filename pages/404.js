import React from 'react'
import { Result, Button } from 'antd';
import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter()
    return (
        <Result
            status="404"
            title="404"
            subTitle="ขออภัยไม่พบหน้าที่คุณต้องการ"
            extra={<Button onClick={() => router.back() } type="primary">กลับไปหน้าที่แล้ว</Button>}
        />
    )
}
