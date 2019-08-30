(window.webpackJsonpecommerce=window.webpackJsonpecommerce||[]).push([[6],{287:function(e,t,a){"use strict";function r(e){return(JSON.parse(localStorage.getItem("articles"))||[]).find(function(t){return t.id===e})}function i(e){var t={success:!0},a=localStorage.getItem("latest_article_id",0),r=JSON.parse(localStorage.getItem("articles"))||[];return e.id=a+1,r.push(e),t.articles=r,localStorage.setItem("articles",JSON.stringify(r)),localStorage.setItem("latest_article_id",e.id),t}function n(e){var t={success:!1},a=JSON.parse(localStorage.getItem("articles"))||[];return a=a.map(function(a){return a.id===e.id&&(a=e,t.success=!0),a}),localStorage.setItem("articles",JSON.stringify(a)),t.articles=a,t}function s(e){var t={success:!0},a=JSON.parse(localStorage.getItem("articles"))||[];return a=a.filter(function(t){return t.id!==e.id}),localStorage.setItem("articles",JSON.stringify(a)),t.articles=a,t}a.d(t,"d",function(){return r}),a.d(t,"a",function(){return i}),a.d(t,"c",function(){return n}),a.d(t,"b",function(){return s})},288:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return o}),a.d(t,"c",function(){return c});var r=a(12),i=a(35),n=a(287);function s(e){var t=Object(n.a)(e);return t.success&&i.NotificationManager.success("Article Created Successfully!"),{type:r.a,payload:t}}function o(e){var t=Object(n.b)(e);if(t.success)return i.NotificationManager.success("Article Deleted Successfully!"),{type:r.b,payload:t};i.NotificationManager.error("Article is not found!")}function c(e){var t=Object(n.c)(e);return t.success?i.NotificationManager.success("Article Edited Successfully!"):i.NotificationManager.error("Article is not found!"),{type:r.c,payload:t}}},314:function(e,t,a){e.exports=a.p+"static/media/no-image-selected.213f8970.png"},315:function(e,t,a){"use strict";var r=a(20),i=a(16),n=a(26),s=a(27),o=a(28),c=a(0),l=a.n(c),u=a(268),m=a(270),d=a(263),g=a(6),p=a(314),f=a.n(p),h=a(35),E=4194304,S=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(s.a)(t).call(this,e))).onImageChange=function(e){var t=e.target.files[0],r=new FileReader;a.setState({loading:!0}),r.onload=function(e){a.setState({image:e.target.result,loading:!1}),a.props.handleImageChange(e.target.result)};var i=a.checkFileConditions(t);i.success?r.readAsDataURL(t):(h.NotificationManager.error(i.msg),e.target.value="",a.setState({image:"",loading:!1}))},a.checkFileConditions=function(e){var t={success:!0,msg:""};return e?e.size>E?(t.success=!1,t.msg="Image should be maximum 4MB",t):e.type.startsWith("image/")?t:(t.success=!1,t.msg="Please select only images",t):(t.success=!1,t.msg="Please select a file",t)},a.state={image:"",loading:!1,imageError:a.props.imageError},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.setState({image:this.props.image})}},{key:"componentWillReceiveProps",value:function(e){this.props.imageError!==e.imageError&&this.setState({imageError:e.imageError})}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.name,r=this.state,i=r.image,n=r.loading,s=r.imageError;return l.a.createElement(u.a,{item:!0,container:!0,xs:12,spacing:1},l.a.createElement(u.a,{item:!0,xs:6},l.a.createElement(m.a,{required:!0,fullWidth:!0,name:a,variant:"outlined",type:"file",id:a,error:s,helperText:s,onChange:this.onImageChange})),l.a.createElement(u.a,{item:!0,xs:6,className:t.imageWrapper},!n&&l.a.createElement("img",{className:t.img,src:i||f.a}),n&&l.a.createElement(d.a,{className:t.progress})))}}]),t}(l.a.Component);S.defaultProps={handleImageChange:function(){}};t.a=Object(g.a)(function(e){return{img:{maxWidth:"100%",maxHeight:"300px"},imageWrapper:{display:"flex",justifyContent:"center"},progress:{margin:e.spacing(2)}}})(S)},463:function(e,t,a){"use strict";a.r(t);var r=a(8),i=a(20),n=a(16),s=a(26),o=a(27),c=a(28),l=a(0),u=a.n(l),m=a(6),d=a(263),g=a(268),p=a(270),f=a(267),h=a(253),E=a(52),S=a(264),b=a(304),v=a(350),y=(a(351),a(30)),C=a(315),N=a(288),O=a(287),x=a(50),j=a(32),I=a.n(j),A=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).state={title:"",date:"",image:"",editorState:b.EditorState.createEmpty(),loading:!0},a.handleChange=function(e){var t=e.target;a.setState(Object(r.a)({},t.name,t.value))},a.handleImageChange=function(e){a.setState({image:e})},a.onEditorStateChange=function(e){a.setState({editorState:e})},a.onArticleEdit=function(e){e.preventDefault();var t=a.vaildateArticleData();t&&(a.props.editArticleAction(t),a.props.history.push("/dashboard/articles"))},a.clearErrorMessages=function(){a.setState(function(){return{titleError:"",contentError:"",imageError:"",dateError:""}})},a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id,t=Object(O.d)(e);t&&this.setState({article:t,title:t.title,date:t.date,image:t.image,editorState:b.EditorState.createWithContent(Object(b.convertFromRaw)(t.content))}),this.setState({loading:!1})}},{key:"vaildateArticleData",value:function(){var e=this.state,t=e.title,a=e.editorState,r=e.image,i=e.date,n=e.article.id,s=Object(b.convertToRaw)(a.getCurrentContent());this.clearErrorMessages();var o=!0;if(I.a.isEmpty(t)&&(o=!1,this.setState(function(){return{titleError:"Title is required"}})),s.blocks.find(function(e){return!I.a.isEmpty(e.text)})||(o=!1,this.setState(function(){return{contentError:"Content is required"}})),I.a.isEmpty(r)&&(o=!1,this.setState(function(){return{imageError:"Image is required"}})),I.a.isEmpty(i)&&(o=!1,this.setState(function(){return{dateError:"Date is required"}})),o)return{title:t,content:s,image:r,date:i,id:n}}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,r=a.title,i=a.date,n=a.editorState,s=a.image,o=a.article,c=a.loading,l=this.state,m=l.titleError,b=l.contentError,y=l.imageError,N=l.dateError;return c?u.a.createElement(d.a,{className:t.progress}):o?u.a.createElement(S.a,{component:"main",maxWidth:"md"},u.a.createElement(h.a,null),u.a.createElement("div",{className:t.paper},u.a.createElement(E.a,{component:"h1",variant:"h5"},"Edit article"),u.a.createElement("form",{className:t.form,noValidate:!0,onSubmit:function(t){return e.onArticleEdit(t)}},u.a.createElement(g.a,{container:!0,spacing:2},u.a.createElement(g.a,{item:!0,xs:12,sm:6},u.a.createElement(p.a,{name:"title",variant:"outlined",required:!0,fullWidth:!0,id:"title",label:"Title",autoFocus:!0,value:r,onChange:this.handleChange,error:m,helperText:m})),u.a.createElement(g.a,{item:!0,xs:12,sm:6},u.a.createElement(p.a,{id:"date",label:"Date",name:"date",variant:"outlined",required:!0,fullWidth:!0,type:"date",value:i,InputLabelProps:{shrink:!0},onChange:this.handleChange,error:N,helperText:N})),u.a.createElement(g.a,{item:!0,xs:12}),u.a.createElement(C.a,{image:s,imageError:y,handleImageChange:this.handleImageChange}),u.a.createElement(g.a,{item:!0,xs:12},u.a.createElement(v.Editor,{editorState:n,toolbarClassName:"toolbarClassName",wrapperClassName:"wrapperClassName",editorClassName:b?"editorClassNameError":"editorClassName",onEditorStateChange:this.onEditorStateChange}),u.a.createElement("p",{className:t.error},b))),u.a.createElement(f.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Edit")))):u.a.createElement(x.e,null)}}]),t}(u.a.Component);t.default=Object(m.a)(function(e){return{"@global":{body:{backgroundColor:e.palette.common.white},".editorClassName":{height:"300px !important",border:"1px solid #F1F1F1"},".editorClassNameError":{height:"300px !important",border:"1px solid #f44336"}},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},progress:{margin:e.spacing(2)},error:{color:"#f44336",margin:"8px 12px 0"}}})(Object(y.b)(function(e){return e},{editArticleAction:N.c})(A))}}]);
//# sourceMappingURL=6.86aa0fcf.chunk.js.map