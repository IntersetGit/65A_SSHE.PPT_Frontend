import Icon, { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"


interface PictureLoaderProps {
  source : string
}

interface IconMaptype {
  [key : string] : any
}

const PictureLoader : React.FC<PictureLoaderProps> = (props) =>{
  return (
    <>   
        <img src={`/assets/${props.source}`} alt={props.source} width={20} height={20} style={{marginTop : '-10px'}}/>     
    </>
  )
}

const Environment : React.FC = () =>( <PictureLoader source="enviroment.png"/>)
const Activity : React.FC = () =>( <PictureLoader source="activity.png"/>)
const Activity2 : React.FC = () =>(<PictureLoader source="activity2.png"/>)
const AnalysisReport : React.FC = () =>(<PictureLoader source="Analysis-Report.png"/>)
const Contractor : React.FC = () => (<PictureLoader source="contractor.png"/>)
const Contractor2 : React.FC = () => (<PictureLoader source="contractor2.png"/>)
const Health : React.FC = () => (<PictureLoader source="health.png"/>)
const Impact : React.FC = () => (<PictureLoader source="Impact.png"/>)
const Mitigation : React.FC = () => (<PictureLoader source="mitigation.png"/>)
const Mitigation2 : React.FC = () => (<PictureLoader source="mitigation2.png"/>)
const Procedure : React.FC = () => (<PictureLoader source="procedure.png"/>)
const Project : React.FC = () => (<PictureLoader source="project.png"/>)
const Project2 : React.FC = () => (<PictureLoader source="project2.png"/>)
const RiskAssessment : React.FC = () => (<PictureLoader source="Risk Assessment.png"/>)
const RiskIdentification : React.FC = () => (<PictureLoader source="Risk Identification.png"/>)
const RiskRegister : React.FC = () => (<PictureLoader source="Risk Register.png"/>)
const Security : React.FC = () => (<PictureLoader source="security.png"/>)
const SSHEAnalysis : React.FC = () => (<PictureLoader source="SSHE-Analysis.png"/>)
const SSHEGraph : React.FC = () => (<PictureLoader source="SSHE-Graph.png"/>)
const SSHEIncident : React.FC = () => (<PictureLoader source="SSHE-Incident.png"/>)
const SSHEissue : React.FC = () => (<PictureLoader source="sshe-issue.png"/>)
const SSHEStatistic : React.FC = () => (<PictureLoader source="SSHE-Statistic.png"/>)
const User : React.FC = () => (<PictureLoader source="user.png"/>)
const User2 : React.FC = () => (<PictureLoader source="user2.png"/>)

let ICONMAP : IconMaptype = {
  'enviroment' : <Icon component={ Environment as React.ForwardRefExoticComponent<any>}/>,
  'activity' : <Icon component={ Activity as React.ForwardRefExoticComponent<any>}/>,
  'activity2' :<Icon component={ Activity2 as React.ForwardRefExoticComponent<any>}/>, 
  'Analysis-Report' :<Icon component={ AnalysisReport as React.ForwardRefExoticComponent<any>}/>,
  'contractor' : <Icon component={ Contractor as React.ForwardRefExoticComponent<any>}/>,
  'contractor2' : <Icon component={ Contractor2 as React.ForwardRefExoticComponent<any>}/>,
  'health' : <Icon component={ Health as React.ForwardRefExoticComponent<any>}/>,
  'impact' : <Icon component={ Impact as React.ForwardRefExoticComponent<any>}/>,
  'mitigation' : <Icon component={ Mitigation as React.ForwardRefExoticComponent<any>}/>,
  'mitigation2' : <Icon component={ Mitigation2 as React.ForwardRefExoticComponent<any>}/>,
  'procedure' : <Icon component={ Procedure as React.ForwardRefExoticComponent<any>}/>,
  'project' : <Icon component={ Project as React.ForwardRefExoticComponent<any>}/>,
  'project2' : <Icon component={ Project2 as React.ForwardRefExoticComponent<any>}/>,
  'Risk Assessment' : <Icon component={ RiskAssessment as React.ForwardRefExoticComponent<any>}/>,
  'Risk Identification' : <Icon component={ RiskIdentification as React.ForwardRefExoticComponent<any>}/>,
  'Risk Register' : <Icon component={ RiskRegister as React.ForwardRefExoticComponent<any>}/>,
  'security' : <Icon component={ Security as React.ForwardRefExoticComponent<any>}/>,
  'SSHE-Analysis' : <Icon component={ SSHEAnalysis as React.ForwardRefExoticComponent<any>}/>,
  'SSHE-Graph' : <Icon component={ SSHEGraph as React.ForwardRefExoticComponent<any>}/>,
  'SSHE-Incident' : <Icon component={ SSHEIncident as React.ForwardRefExoticComponent<any>}/>,
  'sshe-issue' : <Icon component={ SSHEissue as React.ForwardRefExoticComponent<any>}/>,
  'SSHE-Statistic' : <Icon component={ SSHEStatistic as React.ForwardRefExoticComponent<any>}/>,
  'user' : <Icon component={ User as React.ForwardRefExoticComponent<any>}/>,
  'user2' : <Icon component={ User2 as React.ForwardRefExoticComponent<any>}/>,
}

export default ICONMAP