(self.webpackChunk=self.webpackChunk||[]).push([[542],{79665:function(A,w,e){"use strict";e.r(w),e.d(w,{default:function(){return ue}});var E=e(57338),j=e(26272),D=e(43358),d=e(34041),v=e(58024),K=e(91894),ze=e(89816),J=e(61227),we=e(57663),T=e(71577),De=e(49111),F=e(19650),Te=e(59250),Q=e(13013),Be=e(30887),X=e(28682),I=e(3182),i=e(11849),k=e(86582),Le=e(9715),c=e(58240),m=e(2824),Ae=e(47673),Z=e(4107),q=e(94043),b=e.n(q),_=e(8212),ee=e(95357),te=e(73171),ne=e(92977),se=e(49101),ae=e(71239),h=e(67294),le=e(86455),f=e.n(le),p=e(55149),M=[{label:"Almost certain",value:0},{label:"Likely",value:1},{label:"Possible",value:2},{label:"Unlikely",value:3},{label:"Rare",value:4}],t=e(85893),oe=Z.Z.Search,re=Z.Z.TextArea,ie=function(Ie){var de=(0,h.useState)([]),O=(0,m.Z)(de,2),u=O[0],C=O[1],je=(0,h.useState)(!1),U=(0,m.Z)(je,2),ce=U[0],V=U[1],me=(0,h.useState)(!1),Y=(0,m.Z)(me,2),he=Y[0],H=Y[1],fe=(0,h.useState)(1),P=(0,m.Z)(fe,2),W=P[0],ve=P[1],ge=(0,h.useState)(null),$=(0,m.Z)(ge,2),o=$[0],S=$[1],ye=c.Z.useForm(),xe=(0,m.Z)(ye,1),B=xe[0];(0,h.useEffect)(function(){g()},[]);var g=function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;(0,p.WY)("master/getlikeHood",{medthod:"get",params:{search:s}}).then(function(n){n.items.forEach(function(a,r){a.number=r+1,a.key=r+1}),C(n.items),console.log(n.items)}).catch(function(n){return console.error(n)})},L=function(s){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};switch(console.log("onSaveData",s),s){case"ADD":console.log([].concat((0,k.Z)(u),[(0,i.Z)({key:u.length+1},n)])),C([].concat((0,k.Z)(u),[(0,i.Z)({key:u.length+1},n)]));break;case"UPDATE":var a=u.findIndex(function(x){return x.id==n.id});if(a!=-1){var r=(0,k.Z)(u);r[a]=n,C(r),console.log(r)}break;case"DELETE":console.log(n);var G=(0,k.Z)(u),y=G.filter(function(x){return x.key!=n.key});C(y);break;default:break}},N=function(s){ve(s),V(!0)},Ee=function(){H(!0)},z=function(){B.resetFields(),S(null),V(!1)},ke=function(s){W==1?f().fire({title:"\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",text:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(function(n){n.isConfirmed&&(0,p.WY)("master/manageLikeHood",{method:"post",data:s}).then(function(a){a.status_code&&(L("ADD",(0,i.Z)({id:a.items,key:a.items,number:u.length+1},s)),g(),f().fire("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","","success"))})}):W==2&&f().fire({title:"\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",text:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(function(n){n.isConfirmed&&(0,p.WY)("master/manageLikeHood",{method:"post",data:(0,i.Z)((0,i.Z)({},s),{},{id:o.id})}).then(function(a){a.status_code===201&&(L("UPDATE",(0,i.Z)((0,i.Z)({},s),{},{key:o.key,id:o.id,number:o.number})),g(),f().fire("\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","","success"))})}),z()},Ze={labelCol:{xs:{span:24},sm:{span:24}},wrapperCol:{xs:{span:24},sm:{span:24}}},be=[{key:"edit",icon:(0,t.jsx)(_.Z,{}),label:"\u0E41\u0E01\u0E49\u0E44\u0E02"},{key:"view",icon:(0,t.jsx)(ee.Z,{}),label:"\u0E14\u0E39"},{key:"delete",icon:(0,t.jsx)(te.Z,{}),label:"\u0E25\u0E1A"}],pe=function(){var l=(0,I.Z)(b().mark(function s(n,a){var r;return b().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:r=n.key,r==="edit"?(N(2),S(a),B.setFieldsValue(a)):r==="view"?(Ee(),S(a)):f().fire({title:"\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",text:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(function(x){x.isConfirmed&&(0,p.WY)("master/deleteLikeHood/".concat(a.id),{method:"delete"}).then(function(Se){Se.status_code==200&&(L("DELETE",a),g(),f().fire("\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","","success"))})});case 2:case"end":return y.stop()}},s)}));return function(n,a){return l.apply(this,arguments)}}(),Ce=[{title:"Description",dataIndex:"description",key:"Description"}],R=[{title:"No",dataIndex:"number",key:"number",align:"center",width:"10%",sorter:function(s,n){return s.number-n.number}},{title:"Likelihood",dataIndex:"name_eng",key:"name_eng",align:"center",render:function(s){return(0,t.jsx)("p",{align:"left",children:s})}},{title:"\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22",dataIndex:"name_thai",key:"name_thai",align:"center",render:function(s){return(0,t.jsx)("p",{align:"left",children:s})}},{title:"Value",dataIndex:"value",key:"value",align:"center",render:function(s){var n=M.find(function(a){return a.value===s});return(0,t.jsx)("p",{align:"center",children:n==null?void 0:n.label},n==null?void 0:n.value)}},{title:"Action",key:"action",align:"center",valueType:"option",render:function(s){return(0,t.jsx)(Q.Z.Button,{icon:(0,t.jsx)(ne.Z,{}),type:"text",overlay:(0,t.jsx)(X.Z,{items:be,onClick:function(a){return pe(a,s)}})})}}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(K.Z,{style:{marginTop:"1rem"},bordered:!0,children:[(0,t.jsxs)(F.Z,{children:[(0,t.jsx)("p",{children:"\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E14\u0E49\u0E27\u0E22\u0E0A\u0E37\u0E48\u0E2D"}),(0,t.jsx)(oe,{placeholder:"Search",style:{width:300,marginBottom:10},enterButton:!0,allowClear:!0,onSearch:function(s){g(s)}})]}),(0,t.jsx)(T.Z,{type:"primary",style:{float:"right"},icon:(0,t.jsx)(se.Z,{}),onClick:function(){return N(1)},children:"\u0E40\u0E1E\u0E34\u0E48\u0E21 Likelihood"}),(0,t.jsx)(J.Z,{columns:R,dataSource:u,expandable:!0,size:"middle",pagination:{pageSize:8}})]}),(0,t.jsx)(j.Z,{title:"Likelihood",headerStyle:{textAlign:"center"},onClose:z,onCancel:z,visible:ce,closable:!0,maskClosable:!1,keyboard:!1,width:"40%",children:(0,t.jsxs)(c.Z,(0,i.Z)((0,i.Z)({},Ze),{},{layout:"vertical",name:"likelihoodform",id:"likelihoodform",form:B,onFinish:ke,size:"large",initialValues:{},children:[(0,t.jsx)(c.Z.Item,{label:"Likelihood",name:"name_eng",rules:[{required:!0,message:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D Likelihood"}],children:(0,t.jsx)(Z.Z,{})}),(0,t.jsx)(c.Z.Item,{label:"\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22",name:"name_thai",children:(0,t.jsx)(Z.Z,{})}),(0,t.jsx)(c.Z.Item,{label:"Value",name:"value",rules:[{required:!0,message:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01 Value"}],children:(0,t.jsx)(d.Z,{options:M})}),(0,t.jsx)(c.Z.Item,{label:"\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22",name:"description",children:(0,t.jsx)(re,{rows:8,autoSize:{minRows:8,width:12}})}),(0,t.jsx)(c.Z.Item,{children:(0,t.jsxs)(F.Z,{style:{float:"right"},children:[(0,t.jsx)(T.Z,{type:"primary",htmlType:"sumbit",children:"\u0E15\u0E01\u0E25\u0E07"}),(0,t.jsx)(T.Z,{onClick:z,children:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"})]})})]}))}),(0,t.jsx)(j.Z,{width:700,visible:he,onClose:function(){S(void 0),H(!1)},closable:!0,children:(o==null?void 0:o.id)&&(0,t.jsx)(ae.vY,{column:1,bordered:!0,title:o==null?void 0:o.name_eng,request:(0,I.Z)(b().mark(function l(){return b().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",{data:o||{}});case 1:case"end":return n.stop()}},l)})),params:{id:o==null?void 0:o.name_eng},columns:[].concat(R,Ce)})})]})},ue=ie},46700:function(A,w,e){var E={"./af":42786,"./af.js":42786,"./ar":30867,"./ar-dz":14130,"./ar-dz.js":14130,"./ar-kw":96135,"./ar-kw.js":96135,"./ar-ly":56440,"./ar-ly.js":56440,"./ar-ma":47702,"./ar-ma.js":47702,"./ar-sa":16040,"./ar-sa.js":16040,"./ar-tn":37100,"./ar-tn.js":37100,"./ar.js":30867,"./az":31083,"./az.js":31083,"./be":9808,"./be.js":9808,"./bg":68338,"./bg.js":68338,"./bm":67438,"./bm.js":67438,"./bn":8905,"./bn-bd":76225,"./bn-bd.js":76225,"./bn.js":8905,"./bo":11560,"./bo.js":11560,"./br":1278,"./br.js":1278,"./bs":80622,"./bs.js":80622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":50877,"./cv.js":50877,"./cy":47373,"./cy.js":47373,"./da":24780,"./da.js":24780,"./de":59740,"./de-at":60217,"./de-at.js":60217,"./de-ch":60894,"./de-ch.js":60894,"./de.js":59740,"./dv":5300,"./dv.js":5300,"./el":50837,"./el.js":50837,"./en-au":78348,"./en-au.js":78348,"./en-ca":77925,"./en-ca.js":77925,"./en-gb":22243,"./en-gb.js":22243,"./en-ie":46436,"./en-ie.js":46436,"./en-il":47207,"./en-il.js":47207,"./en-in":44175,"./en-in.js":44175,"./en-nz":76319,"./en-nz.js":76319,"./en-sg":31662,"./en-sg.js":31662,"./eo":92915,"./eo.js":92915,"./es":55655,"./es-do":55251,"./es-do.js":55251,"./es-mx":96112,"./es-mx.js":96112,"./es-us":71146,"./es-us.js":71146,"./es.js":55655,"./et":5603,"./et.js":5603,"./eu":77763,"./eu.js":77763,"./fa":76959,"./fa.js":76959,"./fi":11897,"./fi.js":11897,"./fil":42549,"./fil.js":42549,"./fo":94694,"./fo.js":94694,"./fr":94470,"./fr-ca":63049,"./fr-ca.js":63049,"./fr-ch":52330,"./fr-ch.js":52330,"./fr.js":94470,"./fy":5044,"./fy.js":5044,"./ga":29295,"./ga.js":29295,"./gd":2101,"./gd.js":2101,"./gl":38794,"./gl.js":38794,"./gom-deva":27884,"./gom-deva.js":27884,"./gom-latn":23168,"./gom-latn.js":23168,"./gu":95349,"./gu.js":95349,"./he":24206,"./he.js":24206,"./hi":30094,"./hi.js":30094,"./hr":30316,"./hr.js":30316,"./hu":22138,"./hu.js":22138,"./hy-am":11423,"./hy-am.js":11423,"./id":29218,"./id.js":29218,"./is":90135,"./is.js":90135,"./it":90626,"./it-ch":10150,"./it-ch.js":10150,"./it.js":90626,"./ja":39183,"./ja.js":39183,"./jv":24286,"./jv.js":24286,"./ka":12105,"./ka.js":12105,"./kk":47772,"./kk.js":47772,"./km":18758,"./km.js":18758,"./kn":79282,"./kn.js":79282,"./ko":33730,"./ko.js":33730,"./ku":1408,"./ku.js":1408,"./ky":33291,"./ky.js":33291,"./lb":36841,"./lb.js":36841,"./lo":55466,"./lo.js":55466,"./lt":57010,"./lt.js":57010,"./lv":37595,"./lv.js":37595,"./me":39861,"./me.js":39861,"./mi":35493,"./mi.js":35493,"./mk":95966,"./mk.js":95966,"./ml":87341,"./ml.js":87341,"./mn":5115,"./mn.js":5115,"./mr":10370,"./mr.js":10370,"./ms":9847,"./ms-my":41237,"./ms-my.js":41237,"./ms.js":9847,"./mt":72126,"./mt.js":72126,"./my":56165,"./my.js":56165,"./nb":64924,"./nb.js":64924,"./ne":16744,"./ne.js":16744,"./nl":93901,"./nl-be":59814,"./nl-be.js":59814,"./nl.js":93901,"./nn":83877,"./nn.js":83877,"./oc-lnc":92135,"./oc-lnc.js":92135,"./pa-in":15858,"./pa-in.js":15858,"./pl":64495,"./pl.js":64495,"./pt":89520,"./pt-br":57971,"./pt-br.js":57971,"./pt.js":89520,"./ro":96459,"./ro.js":96459,"./ru":21793,"./ru.js":21793,"./sd":40950,"./sd.js":40950,"./se":37930,"./se.js":37930,"./si":90124,"./si.js":90124,"./sk":64249,"./sk.js":64249,"./sl":14985,"./sl.js":14985,"./sq":51104,"./sq.js":51104,"./sr":49131,"./sr-cyrl":79915,"./sr-cyrl.js":79915,"./sr.js":49131,"./ss":95606,"./ss.js":95606,"./sv":98760,"./sv.js":98760,"./sw":91172,"./sw.js":91172,"./ta":27333,"./ta.js":27333,"./te":23110,"./te.js":23110,"./tet":52095,"./tet.js":52095,"./tg":27321,"./tg.js":27321,"./th":9041,"./th.js":9041,"./tk":19005,"./tk.js":19005,"./tl-ph":75768,"./tl-ph.js":75768,"./tlh":89444,"./tlh.js":89444,"./tr":72397,"./tr.js":72397,"./tzl":28254,"./tzl.js":28254,"./tzm":51106,"./tzm-latn":30699,"./tzm-latn.js":30699,"./tzm.js":51106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":67691,"./uk.js":67691,"./ur":13795,"./ur.js":13795,"./uz":6791,"./uz-latn":60588,"./uz-latn.js":60588,"./uz.js":6791,"./vi":65666,"./vi.js":65666,"./x-pseudo":14378,"./x-pseudo.js":14378,"./yo":75805,"./yo.js":75805,"./zh-cn":83839,"./zh-cn.js":83839,"./zh-hk":55726,"./zh-hk.js":55726,"./zh-mo":99807,"./zh-mo.js":99807,"./zh-tw":74152,"./zh-tw.js":74152};function j(d){var v=D(d);return e(v)}function D(d){if(!e.o(E,d)){var v=new Error("Cannot find module '"+d+"'");throw v.code="MODULE_NOT_FOUND",v}return E[d]}j.keys=function(){return Object.keys(E)},j.resolve=D,A.exports=j,j.id=46700}}]);