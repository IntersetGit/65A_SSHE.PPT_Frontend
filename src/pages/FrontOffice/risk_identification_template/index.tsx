import { EditableProTable } from "@ant-design/pro-components"
import type { ProColumns } from '@ant-design/pro-components'


const RiskIdenTemPlate: React.FC = () => {

    const columns:  ProColumns[] = [
        {
            title : 'Risk No.',
            fixed : 'left',
            width: 100,
        },
        {
            title : 'Risk Description and Control',
            children : [
                {
                    title : 'Works Activity',
                    width: 150,
                },
                {
                    title : 'Hazard',
                    width: 250,
                },
                {
                    title : 'Existing control',
                    width: 250,
                },
                {
                    title : 'Overall control effectiveness'
                }
            ]
        },
        {
            title : 'Initial Risk',
            children : [
                {
                    title : 'Consequence'
                },
                {
                    title : 'Likelihood'
                },
                {
                    title : 'Initial Risk'
                },
                {
                    title : 'Opp/ Threat'
                },
            ]
        },
        {
            title : 'Risk Treatment Plan and Residual Risk',
            children : [
                {
                    title : 'Risk treatment plan'
                },
                {
                    title : 'Consequence'
                },
                {
                    title : 'Likelihood'
                },
                {
                    title : 'Residual Risk'
                },
                {
                    title : 'Action Party'
                },
                {
                    title : 'Due date'
                }
            ]
        },
        {
            title : 'Review and Monitor (Ongoing Risk Management)',
            children : [
                {
                    title : 'Risk status'
                },
                {
                    title : 'Risk (Current)'
                },
                {
                    title : 'Days to Due Date'
                },
                {
                    title : 'Comments'
                }
            ]
        },
        {
            title : 'Action',
            fixed : 'right',
            width: 100,
        },
    ]
    return (
        <>
            <EditableProTable
            headerTitle="Risk Identification Template Data"
            bordered
            size="middle"
            scroll={ { x : '100vw' , y : 240}}
            columns={columns}/>
            
        </>
    )
}

export default RiskIdenTemPlate