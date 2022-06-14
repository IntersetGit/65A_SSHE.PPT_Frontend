import { ActionType, EditableProTable } from "@ant-design/pro-components"
import type { ProColumns } from '@ant-design/pro-components'
import { Button, Form } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import React, { useRef, useState } from "react"
import { simple_data } from "./simple_data"

export type RiskRegisterType = {
    consequence: string
    existing_control: Array<string>
    hazard: Array<string>
    index: number
    initial_risk: string
    keys: React.Key
    likelihood: string
    opp_threat: string
    overall_control_effectiveness: string
    review_comments: string
    review_days_to_due_date: string
    review_risk: string
    review_risk_status: string
    risk_action_Party: string
    risk_consequence: string
    risk_due_date: string
    risk_likelihood: string
    risk_no: number
    risk_residual_Risk: string
    risk_treatment_plan: string
    work_activity: string
}

const RiskRegisterAndAction : React.FC = () => {

    const columns:  ProColumns<RiskRegisterType>[] = [
        {
            title : 'Risk No.',
            key: 'risk_no',
            dataIndex:'risk_no',
            fixed : 'left',
            valueType : 'digit',
            width: 100,
        },
        {
            title : 'Risk Description and Control',
            key : 'risk_description_and_control',
            children : [
                {
                    title : 'Works Activity',
                    key: 'work_activity',
                    dataIndex:'work_activity',
                    width: 400,
                    valueType : 'select',
                    valueEnum: {
                        'Working closely existing facility' : { text : 'Working closely existing facility'  } ,    
                        'Transportation of workers/ Road accidents': { text : 'Transportation of workers/ Road accidents' , } ,
                        'Working in deep excavation': { text : 'Working in deep excavation' , } ,
                        'Trench excavation': { text : 'Trench excavation' , } ,
                        'Lifting': { text : 'Lifting' , } ,
                        'Work at height': { text : 'Work at height' , } ,
                    } ,
                },
                {
                    title : 'Hazard',
                    key: 'hazard',
                    dataIndex:'hazard',
                    width: 600,
                    valueType : 'select',
                    fieldProps : {
                        mode : 'multiple',
                    },
                    valueEnum: {
                        'Gas release and Fire causing Personal injury and property damage' : { text : 'Gas release and Fire causing Personal injury and property damage'  } ,    
                        'Accident transportation cause property damage': { text : 'Accident transportation cause property damage' , } ,
                        'injury to workman': { text : 'injury to workman' , } ,
                        'Injury to public/people': { text : 'Injury to public/people' , } ,
                        'Excavation collapse due to not enough shoring and protection causing injury': { text : 'Excavation collapse due to not enough shoring and protection causing injury' , } ,
                        'Lifting equipment and material': { text : 'Lifting equipment and material' , } ,
                        'Falling object': { text : 'Falling object' , } ,
                        'Refer to item 12 confined space entry': { text : 'Refer to item 12 confined space entry' , } ,
                        'Flooding': { text : 'Flooding' , } ,
                        'Access is not enough': { text : 'Access is not enough' , } ,
                        'Damage to under ground utility': { text : 'Damage to under ground utility' , } ,
                        'Water jetting injury': { text : 'Water jetting injury' , } ,
                        'Drowning/water logging inside the trench': { text : 'Drowning/water logging inside the trench' , } ,
                        'Operator not competent': { text : 'Operator not competent' , } ,
                        'Load fall while lifting cauing damage to property and injury to people': { text : 'Load fall while lifting cauing damage to property and injury to people' , } ,
                        'Crane topple over injury to people and property damage': { text : 'Crane topple over injury to people and property damage' , } ,
                        'Lifting equipment failure': { text : 'Lifting equipment failure' , } ,
                        'Pinch points on body part while lifting': { text : 'Pinch points on body part while lifting' , } ,
                        'Heavy rain during lifting cause crane topple, load drop on work crew and property': { text : 'Heavy rain during lifting cause crane topple, load drop on work crew and property' , } ,
                        'Worker falling': { text : 'Worker falling' , } ,
                    } ,
                    render(dom, entity, index, action, schema) {
                        return(
                        <>
                            {entity.hazard&&
                                entity.hazard.map((v : any,k : any)=>{
                                    return (<p>{k+1}.{v}</p>)
                                })
                            }
                        </>
                        )
                    },
                },
                {
                    title : 'Existing control',
                    key : 'existing_control',
                    dataIndex:'existing_control',
                    width: 500,
                    valueType : 'select',
                    fieldProps : {
                        mode : 'multiple',
                    },
                    valueEnum: {
                        'Conduct Sub-contractor training before work on site for Supervisor and Worker' : { text : 'Conduct Sub-contractor training before work on site for Supervisor and Worker'  } ,    
                        'Conduct daily tool box meeting': { text : 'Conduct daily tool box meeting' , } ,
                        'Close supervision by Main Contrcactor Supervisor': { text : 'Close supervision by Main Contrcactor Supervisor' , } ,
                        'Provide gas detector to be monitoring (ISBL)': { text : 'Provide gas detector to be monitoring (ISBL)' , } ,
                        'Provide fire extinguisher': { text : 'Provide fire extinguisher' , } ,
                        'Assign fire watchman during the work activity (ISBL)': { text : 'Assign fire watchman during the work activity (ISBL)' , } ,
                        'Make the fence to isolate area': { text : 'Make the fence to isolate area' , } ,
                    } ,
                    render(dom, entity, index, action, schema) {
                        return(
                        <>
                            {entity.existing_control&& 
                                entity.existing_control.map((v : any,k : any)=>{
                                    return (<p>{k+1}.{v}</p>)
                                })
                            }
                        </>
                        )
                    },
                },
                {
                    title : 'Overall control effectiveness',
                    key : 'overall_control_effectiveness',
                    dataIndex:'overall_control_effectiveness',
                    width: 250,
                }
            ]
        },
        {
            title : 'Initial Risk',
            key : 'initial_risk_head',
            children : [
                {
                    title : 'Consequence',
                    key : 'consequence',
                    dataIndex:'consequence',
                    width: 150,
                    valueType : 'select',
                    valueEnum: {
                        'Major' : { text : 'Major'  } ,    
                        'Moderate': { text : 'Moderate' , } ,
                    } ,
                },
                {
                    title : 'Likelihood',
                    key : 'likelihood',
                    dataIndex:'likelihood',
                    width: 150,
                    valueType : 'select',
                    valueEnum: {
                        'Likely' : { text : 'Likely'  } ,    
                        'Possible': { text : 'Possible' } ,
                        'Rare': { text : 'Rare' } ,
                        'Unlikely': { text : 'Unlikely' } ,
                        'Almost Certain': { text : 'Almost Certain' } ,
                    } ,
                },
                {
                    title : 'Initial Risk',
                    key : 'initial_risk',
                    dataIndex:'initial_risk',
                    width: 150,
                    valueType : 'select',
                    valueEnum: {
                        'Low' : { text : 'Low'  } ,    
                        'Medium': { text : 'Medium' } ,
                        'High': { text : 'High' } ,
                        'Very High': { text : 'Very High' } ,
                    } ,
                },
                {
                    title : 'Opp/ Threat',
                    key : 'opp_threat',
                    dataIndex:'opp_threat',
                    width: 150,
                },
            ]
        },
        {
            title : 'Risk Treatment Plan and Residual Risk',
            key : 'risk',
            children : [
                {
                    title : 'Risk treatment plan',
                    key : 'risk_treatment_plan',
                    dataIndex:'risk_treatment_plan',
                    width : 150,
                    valueType : 'text'
                },
                {
                    title : 'Consequence',
                    key : 'risk_consequence',
                    dataIndex:'risk_consequence',
                    width : 150,
                    valueType : 'select',
                    valueEnum: {
                        'Major' : { text : 'Major'  } ,    
                        'Moderate': { text : 'Moderate' , } ,
                    } ,
                },
                {
                    title : 'Likelihood',
                    key : 'risk_likelihood',
                    dataIndex:'risk_likelihood',
                    width : 150,
                    valueType : 'select',
                    valueEnum: {
                        'Likely' : { text : 'Likely'  } ,    
                        'Possible': { text : 'Possible' } ,
                        'Rare': { text : 'Rare' } ,
                        'Unlikely': { text : 'Unlikely' } ,
                        'Almost Certain': { text : 'Almost Certain' } ,
                    } ,
                },
                {
                    title : 'Residual Risk',
                    key : 'risk_residual_Risk',
                    dataIndex:'risk_residual_Risk',
                    width: 150,
                    valueType : 'select',
                    valueEnum: {
                        'Low' : { text : 'Low'  } ,    
                        'Medium': { text : 'Medium' } ,
                        'High': { text : 'High' } ,
                        'Very High': { text : 'Very High' } ,
                    } ,
                },
                {
                    title : 'Action Party',
                    key : 'risk_action_Party',
                    dataIndex:'risk_action_Party',
                    valueType : 'text'
                },
                {
                    title : 'Due date',
                    key : 'risk_due_date',
                    dataIndex:'risk_due_date',
                    valueType : 'text'
                }
            ]
        },
        {
            title : 'Review and Monitor (Ongoing Risk Management)',
            key : 'review',
            children : [
                {
                    title : 'Risk status',
                    key : 'review_risk_status',
                    dataIndex:'review_risk_status',
                    valueType : 'text'
                },
                {
                    title : 'Risk (Current)',
                    key : 'review_risk',
                    dataIndex:'review_risk',
                    valueType : 'text'
                },
                {
                    title : 'Days to Due Date',
                    key : 'review_days_to_due_date',
                    dataIndex:'review_days_to_due_date',
                    width : 150,
                    valueType : 'text'
                },
                {
                    title : 'Comments',
                    key : 'review_comments',
                    dataIndex:'review_comments',
                    width : 250,
                    valueType : 'text'
                }
            ]
        },
        {
            title : 'Action',
            valueType : 'option',
            fixed : 'right',
            width: 150,
            render: (text, record, _, action) => [
                <a
                  color="lime"
                  key="editable"
                  onClick={() => {
                    action?.startEditable?.(record.keys);
                  } }
                >
                  แก้ไข
                </a>,
                <EditableProTable.RecordCreator
                  key="copy"
                  record={{
                    ...record,
                    keys: dataSource.length + 1,
                  } }
                >
                  <a> คัดลอกเทมเพลต </a>
                </EditableProTable.RecordCreator>,
            ] ,
        },
    ]

    const actionRef = useRef<ActionType>()
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
    const [dataSource,setDataSource] = useState<RiskRegisterType[]>([])
    const [form] = Form.useForm()
    return (
        <>
            <EditableProTable<RiskRegisterType>
            headerTitle="Risk Register and Action Plan Data"
            rowKey="keys"
            bordered
            request={async () => ({
                data: simple_data,
                total: simple_data.length,
                success: true,
            } ) }
            actionRef={actionRef}
            size="small"
            cardBordered
            editable={{
                form,
                editableKeys,
                onSave: async (key , record) => {
                    console.log('saved',record)
                },
                onChange: setEditableRowKeys,
                actionRender: (row, config, dom) => [dom.save, dom.cancel],
            }}
            
            scroll={{ x: 6200, y: 600 }}
            columns={columns}
            recordCreatorProps={false}
            value={dataSource}
            onChange={setDataSource}
            search={{
                labelWidth: 'auto',
            }}
            footer={() => [ 
            <Button 
            type="primary"
            onClick={() =>{
                console.log(actionRef.current?.pageInfo)
                actionRef.current?.addEditRecord?.({
                    keys : dataSource.length + 1,
                    risk_no : dataSource.length + 1
                })
            }}
            icon={<PlusOutlined/>}>
                เพิ่มข้อมูล
            </Button> 
            ]}
            />
        </>
    )
}

export default RiskRegisterAndAction