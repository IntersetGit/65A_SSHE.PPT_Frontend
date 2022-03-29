import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'antd';

export default function Home() {
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </>
  )
}
