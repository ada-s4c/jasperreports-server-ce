define(["require","exports","module","prototype","../core/core.events.bis","underscore","../core/core.layout","../dynamicTree/dynamicTree.utils","./components.dialogs","../util/utils.common","jquery"],function(e,t,i){var s=e("prototype"),o=s.$,d=s.$F,h=e("../core/core.events.bis"),r=e("underscore"),_=e("../core/core.layout"),l=e("../dynamicTree/dynamicTree.utils"),n=e("./components.dialogs"),c=e("../util/utils.common"),a=c.matchAny,u=e("jquery"),T={};T.FileSelector=function(e){this._disabled=void 0!==e.disabled&&e.disabled,this._uriTextbox=o(e.uriTextboxId),this._browseButtonId=o(e.browseButtonId),this._onChange=e.onChange||!1,this._options=e,this._disabled?(h.disable(this._uriTextbox),h.disable(this._browseButtonId)):(this._id=e.id,this._suffix=e.suffix?e.suffix:(new Date).getTime(),this._treeDomId=e.treeId,this._selectLeavesOnly=void 0!==e.selectLeavesOnly&&e.selectLeavesOnly,this._selectedUri=d(this._uriTextbox),this._process(e),this._assignHandlers(),this._refreshButtonsState())},T.FileSelector.addVar("DEFAULT_TEMPLATE_DOM_ID","selectFromRepository"),T.FileSelector.addVar("DEFAULT_TREE_ID","selectFromRepoTree"),T.FileSelector.addVar("OK_BUTTON_ID","selectFromRepoBtnSelect"),T.FileSelector.addVar("CANCEL_BUTTON_ID","selectFromRepoBtnCancel"),T.FileSelector.addVar("TITLE_PATTERN","div.title"),T.FileSelector.addMethod("_process",function(e){!this._id&&(this._id=this.DEFAULT_TEMPLATE_DOM_ID),!o(this._id)&&this._options.template&&this._options.i18n?(this._dom=u(r.template(this._options.template,{i18n:this._options.i18n})),this._dom=this._dom[0]):this._dom=o(this._id).cloneNode(!0),this._dom.writeAttribute("id",this._id+this._suffix),this._okButton=this._dom.select("#"+this.OK_BUTTON_ID)[0],this._okButton.writeAttribute("id",this.OK_BUTTON_ID+this._suffix),this._cancelButton=this._dom.select("#"+this.CANCEL_BUTTON_ID)[0],this._cancelButton.writeAttribute("id",this.CANCEL_BUTTON_ID+this._suffix),!this._treeDomId&&(this._treeDomId=this.DEFAULT_TREE_ID),this._treeDom=this._dom.select("#"+this._treeDomId)[0],this._treeDom.writeAttribute("id",this._treeDomId+this._suffix),this._visible=!1,e.title&&this._dom.select(this.TITLE_PATTERN)[0].update(e.title),this._onOk=e.onOk,this._onCancel=e.onCancel,u(document.body).append(this._dom);var t,i=this._dom.down(_.SWIPE_SCROLL_PATTERN);i&&(t=_.createScroller(i));var s=Object.extend({providerId:e.providerId,scroll:t},e.treeOptions);this._tree=l.createRepositoryTree(this._treeDomId+this._suffix,s),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1)}),T.FileSelector.addMethod("_assignHandlers",function(){this._dom.observe("click",this._dialogClickHandler.bindAsEventListener(this)),["node:dblclick","leaf:dblclick"].each(function(e){this._tree.observe(e,this._treeClickHandler.bindAsEventListener(this))},this),["node:click","leaf:click","node:selected","leaf:selected"].each(function(e){this._tree.observe(e,this._refreshButtonsState.bindAsEventListener(this))},this),["childredPrefetched:loaded","tree:loaded"].each(function(e){this._tree.observe(e,this._treeLoadHandler.bindAsEventListener(this))},this),this._browseButtonId.observe("click",this._browseClickHandler.bindAsEventListener(this))}),T.FileSelector.addMethod("_canClickOk",function(e){return this._tree.getSelectedNode()&&(!this._selectLeavesOnly||this._tree.getSelectedNode().param.type!==this._tree.getSelectedNode().FOLDER_TYPE_NAME)}),T.FileSelector.addMethod("_dialogClickHandler",function(e){var t=e.element();if(a(t,["#"+this.OK_BUTTON_ID+this._suffix],!0)){e.stop();var i=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(i),this._onChange&&this._onChange(i),this._hide(),this._onOk&&this._onOk()}else a(t,["#"+this.CANCEL_BUTTON_ID+this._suffix],!0)&&(e.stop(),this._hide(),this._onCancel&&this._onCancel())}),T.FileSelector.addMethod("_treeClickHandler",function(e){if(this._canClickOk()){var t=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(t),this._onChange&&this._onChange(t),this._hide(),this._onOk&&this._onOk()}}),T.FileSelector.addMethod("_treeLoadHandler",function(e){this._visible&&this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri)}),T.FileSelector.addMethod("_browseClickHandler",function(e){e.stop(),this._show()}),T.FileSelector.addMethod("_refreshButtonsState",function(){this._canClickOk()?h.enable(this._okButton):h.disable(this._okButton)}),T.FileSelector.addMethod("_hide",function(){n.popup.hide(this._dom),this._visible=!1}),T.FileSelector.addMethod("_show",function(){this._selectedUri=d(this._uriTextbox),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1),n.popup.show(this._dom,!0),this._visible=!0,this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri),this._refreshButtonsState()}),T.FileSelector.addMethod("remove",function(){u(this._dom).remove()}),i.exports=T});