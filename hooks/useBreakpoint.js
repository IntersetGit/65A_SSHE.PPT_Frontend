import React from "react";
import { Grid } from "antd";


const { useBreakpoint } = Grid

const useBreakpoints = () =>{
  const [curscreen , setcurrscreen] = React.useState({
    size : 'xl',
    indexes : 5
  })

  const screen = useBreakpoint();

  React.useEffect(()=>{

    let scn = {
      size : '',
      indexes : 1
    }

    if ( screen.xs ) { scn.size = 'xs' ; scn.indexes = 1 }
    if ( screen.sm ) { scn.size = 'sm' ; scn.indexes = 2 }
    if ( screen.md ) { scn.size = 'md' ; scn.indexes = 3 }
    if ( screen.lg ) { scn.size = 'lg' ; scn.indexes = 4 }
    if ( screen.xl ) { scn.size = 'xl' ; scn.indexes = 5 }
    if ( screen.xxl ) { scn.size = 'xxl' ; scn.indexes = 6 }

    setcurrscreen(scn)
  },[screen])

  return curscreen
}

export default useBreakpoints