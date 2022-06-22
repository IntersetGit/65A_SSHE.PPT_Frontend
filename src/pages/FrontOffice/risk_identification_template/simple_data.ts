export const simple_data: APITypes.RiskIdentifierTemplateType[] = [
  {
    index: 0,
    keys: 1,
    key: 1,
    risk_no: 1,
    work_activity:
      'Non compliance with Thai law leading to company procequestion in Thai law',
    children: [
      {
        key: '1-1',
        keys: '1-1',
        hazard: 'Prosecution by law Non compliance resulting injury',
        existingControl: [
          'Follow PTT requirement',
          'Follow labor law',
          'EIA requirement',
          'Company procedure',
        ],
      },
      {
        key: '1-2',
        keys: '1-2',
        hazard: 'Prosecution by law Non compliance resulting injury',
        existingControl: [
          'Follow PTT requirement',
          'Follow labor law',
          'EIA requirement',
          'Company procedure',
        ],
      },
    ],
  },
  {
    index: 1,
    keys: 2,
    key: 2,
    risk_no: 2,
    work_activity: 'Understanding of site safety procedure',
    children: [
      {
        key: '2-1',
        keys: '2-1',
        hazard: 'Injury to people Property damage',
        existingControl: [
          'Induction course',
          'Training of supervisor following Thai law',
          'SHE Management Plan',
          'Safety Induction & Training Procedure',
        ],
      },
    ],
  },
];
