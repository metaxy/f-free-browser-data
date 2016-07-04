/******/!function(t){function e(a){if(r[a])return r[a].exports;var n=r[a]={exports:{},id:a,loaded:!1};return t[a].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}// webpackBootstrap
/******/
var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";var a=r(1),n=r(2),o=r(3),l=r(4),i=r(5),s=r(6),c=r(7),d=r(8),u=r(9),m=r(10),p=r(11),g=r(12),h=r(13),f=r(14),b=r(15);angular.module("browserFree",["ngAnimate","ngCookies","ngSanitize","ngMessages","ngAria","ui.router","ngMaterial","ngMdIcons","nvd3"]).config(a.config).config(n.routerConfig).run(o.runBlock).controller("MainController",l.MainController).controller("CompareController",i.CompareController).controller("SiteController",c.SiteController).controller("DialogController",d.DialogController).controller("OverviewController",s.OverviewController).service("ColorService",u.ColorService).service("GraphCompareService",p.GraphCompareService).service("GraphProgCompareService",g.GraphProgCompareService).service("GraphResultsModelService",h.GraphResultsModelService).service("GraphResultsModelScatterService",f.GraphResultsModelScatterService).service("HelperService",m.HelperService).directive("modGraph",b.modGraph)},function(t,e){"use strict";function r(t,e){"ngInject";t.debugEnabled(!0),e.theme("default").primaryPalette("blue").accentPalette("orange").backgroundPalette("grey")}r.$inject=["$logProvider","$mdThemingProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.config=r},function(t,e){"use strict";function r(t,e){"ngInject";t.state("home",{url:"/home",templateUrl:"app/templates/main.html",controller:"MainController",controllerAs:"mainCtrl",resolve:{resolveBenchmarks:["$http",function(t){return t.get("./data_benchmarks/list.json").then(function(t){return t.data})}]}}).state("compare",{url:"/compare/:selected",templateUrl:"app/templates/compare.html",controller:"CompareController",controllerAs:"compareCtrl",params:{selected:{array:!0}},resolve:{resolveData:["$http","$stateParams","$q","HelperService",function(t,e,r,a){if(!e.selected)return[];var n=[];return e.selected.forEach(function(e){var r=t.get(e).then(function(t){return t.data}).then(a.transformResult);n.push(r)}),r.all(n)}],resolveModel:["resolveData","$http","$q",function(t,e,r){var a=[];return t.forEach(function(t){a.push(e.get("./"+t.config.instances+"/graph_info.json").then(function(t){return t.data}))}),r.all(a)}]}}).state("overview",{url:"/overview/:selected",templateUrl:"app/templates/overview.html",controller:"OverviewController",controllerAs:"ctrl",params:{selected:{array:!0}},resolve:{resolveData:["$http","$stateParams","$q","HelperService",function(t,e,r,a){if(!e.selected)return[];var n=[];return e.selected.forEach(function(e){var r=t.get(e).then(function(t){return t.data}).then(a.transformResult);n.push(r)}),r.all(n)}]}}),e.otherwise("/home")}r.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=r},function(t,e){"use strict";function r(){"ngInject"}Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=r},function(t,e){"use strict";function r(t,e){"ngInject";var r=this;this.benchmarks=t,this.compare=function(){var t=[];r.benchmarks.forEach(function(e){e.selected&&t.push("./"+e.fileName)}),e.go("compare",{selected:t})},this.overview=function(){var t=[];r.benchmarks.forEach(function(e){e.selected&&t.push("./"+e.fileName)}),e.go("overview",{selected:t})}}r.$inject=["resolveBenchmarks","$state"],Object.defineProperty(e,"__esModule",{value:!0}),e.MainController=r},function(t,e){"use strict";function r(t,e,r,a,n,o,l,i,s,c,d){"ngInject";var u=this;this.graphs={},_.each(t,function(t,e){u.graphs[e]={x_key:"density",y_key:"quality",modelResult:{data:{},options:c.options},modelResultScatter:{data:{},options:d.options},modelResultBar:{data:{},options:c.optionsBar},compare:{data:{},options:s.options,prog1:t.config.progs[0],prog2:t.config.progs[1]}}}),this.recalculate=function(){_.each(t,function(t,e){u.recalculateOne(e),u.recalculateCompare(e)})},this.recalculateOne=function(r){var a=u.graphs[r],n=t[r],o=c.calculate(e[r],a.x_key,n,a.y_key);a.modelResult.data=o,a.modelResult.api&&a.modelResult.api.updateWithData(o),a.modelResultScatter.data=d.calculate(e[r],a.x_key,n,a.y_key),a.modelResultScatter.api&&a.modelResultScatter.api.updateWithData(a.modelResultScatter.data),a.modelResultBar.data=o,a.modelResultBar.api&&a.modelResultBar.api.updateWithData(o)},this.recalculateCompare=function(e){var r=u.graphs[e].compare;t[e].config.progs.length<2||(r.data=s.calculate(t[e],r.prog1,r.prog2,"quality"),r.api&&r.api.updateWithData(r.data))},this.results=t,this.modelKeys=Object.keys(e[0][Object.keys(e[0])[0]]),this.resultKeys=["time","quality"],this.showRun=function(t,e){r.show({controller:"DialogController",controllerAs:"dialogCtrl",templateUrl:"app/templates/show_run.html",parent:angular.element(a.body),targetEvent:t,clickOutsideToClose:!0,locals:{item:e},bindToController:!0})},this.compareRun=function(t,e){r.show({controller:"DialogController",controllerAs:"dialogCtrl",templateUrl:"app/templates/compare_run.html",parent:angular.element(a.body),targetEvent:t,clickOutsideToClose:!0,locals:{items:e},bindToController:!0})},this.optionsProgCompare=i.options,this.dataOptionsProgCompare=i.calculate(t),this.recalculate()}r.$inject=["resolveData","resolveModel","$mdDialog","$document","$log","$scope","$timeout","GraphCompareService","GraphProgCompareService","GraphResultsModelService","GraphResultsModelScatterService"],Object.defineProperty(e,"__esModule",{value:!0}),e.CompareController=r},function(t,e){"use strict";function r(t){"ngInject";this.results=t}r.$inject=["resolveData"],Object.defineProperty(e,"__esModule",{value:!0}),e.OverviewController=r},function(t,e){"use strict";function r(t){"ngInject";this.back=function(){t.history.back()}}r.$inject=["$window"],Object.defineProperty(e,"__esModule",{value:!0}),e.SiteController=r},function(t,e){"use strict";function r(){"ngInject"}Object.defineProperty(e,"__esModule",{value:!0}),e.DialogController=r},function(t,e){"use strict";function r(){"ngInject";var t=this;this.list1=["#5A9BD4","#7AC36A","#F15A60","#FAA75B","#9E67AB","#737373"],this.list2=["#185AA9","#008C48","#EE2E2F","#F47D23","#662C91","#010202"],this.list3=["#185AA9","#008C48","#EE2E2F","#F47D23","#662C91","#010202"],this.getColor=function(e,r){return t.ColorLuminance(t.list1[e],.1*r)},this.getColorLight=function(e,r){return t.ColorLuminance(t.list2[e],.1*r)},this.getColorDark=function(e,r){return t.ColorLuminance(t.list3[e],.1*r)},this.ColorLuminance=function(t,e){t=String(t).replace(/[^0-9a-f]/gi,""),t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e=e||0;var r,a,n="#";for(a=0;3>a;a++)r=parseInt(t.substr(2*a,2),16),r=Math.round(Math.min(Math.max(0,r+r*e),255)).toString(16),n+=("00"+r).substr(r.length);return n}}Object.defineProperty(e,"__esModule",{value:!0}),e.ColorService=r},function(t,e){"use strict";function r(){"ngInject";var t=this;this.basename=function(t){var e=new String(t).substring(t.lastIndexOf("/")+1);return-1!=e.lastIndexOf(".")&&(e=e.substring(0,e.lastIndexOf("."))),e},this.containsChange=function(t,e,r){return void 0!=_(t).find(function(t){return t[0]==e&&t[1]==r||t[1]==e&&t[0]==r})},this.makeEdges=function(e,r){var a=_(e.split("\n")).filter(function(t){return 0!=t.indexOf("#")}).filter(function(t){return 0!=t.length}).map(function(t){return t.split(" ")}),n=_.unique(_.flatten(a)),o=[];for(var l in n){var i=!1;for(var s in n)if(!(l>s)){var c=t.containsChange(r,l,s),d=t.containsChange(a,l,s),u=0;if(c&&d)u=-1;else if(!c&&d)u=0;else if(c&&!d)u=1;else if(!c&&!d)continue;i=!0,o.push({data:{id:l+"-"+s,source:l,target:s,changed:u}})}i&&o.push({data:{id:l}})}return o},this.transformResult=function(e){return e.stats_time_min=_.min(e.stats,function(t){return t.time}).time,e.stats_quality_max=_.max(e.stats,function(t){return t.quality}).quality,e.stats_failed_min=_.min(e.stats,function(t){return t.failed}).failed,e.stats_failed_percent_min=_.min(e.stats,function(t){return t.failed_percent}).failed_percent,e.name=t.basename(e.options.config)+" : "+t.basename(e.config.instances)+" - "+t.basename(e.config.forbidden),e}}Object.defineProperty(e,"__esModule",{value:!0}),e.HelperService=r},function(t,e){"use strict";function r(t){"ngInject";this.options={chart:{type:"multiBarHorizontalChart",height:450,x:function(t){return t.label},y:function(t){return t.value},showControls:!0,showValues:!0,transitionDuration:500,xAxis:{showMaxMin:!1},yAxis:{axisLabel:"Values"}}},this.calculate=function(e){var r={absolut:"Absolut Result",quality:"Quality",quality_inv:"Inverse Quality",distance:"Distance to correct"},a=[],n=0;return e.forEach(function(e){var o=0;_.each(e.stats,function(e,l){var i=[];_.each(r,function(t,r){i.push({label:t,value:e[r]})}),a.push({key:l,color:t.getColor(n,o),values:i}),o++}),n++}),a}}r.$inject=["ColorService"],Object.defineProperty(e,"__esModule",{value:!0}),e.GraphCompareService=r},function(t,e){"use strict";function r(t){"ngInject";this.options={chart:{type:"scatterChart",height:450,width:450,x:function(t){return t.x},y:function(t){return t.y},scatter:{onlyCircles:!1},showDistX:!0,showDistY:!0,xDomain:[0,1],yDomain:[0,1]}},this.calculate=function(e,r,a,n){var o=[];return _.each(e.results,function(t){var e=_.findWhere(t,{prog:r}),l=_.findWhere(t,{prog:a});o.push({x:e[n],y:l[n]})}),[{values:o,key:"Compare",color:t.getColor(0,0)}]}}r.$inject=["ColorService"],Object.defineProperty(e,"__esModule",{value:!0}),e.GraphProgCompareService=r},function(t,e){"use strict";function r(t){"ngInject";this.options={chart:{type:"lineChart",height:450,x:function(t){return t.x},y:function(t){return t.y},showControls:!0,showValues:!0,transitionDuration:0,useInteractiveGuideline:!0,xAxis:{showMaxMin:!1},yAxis:{axisLabel:"Values"},margin:{top:20,right:20,bottom:60,left:65},zoom:{enabled:!1}}},this.optionsBar={chart:{type:"multiBarChart",height:450,x:function(t){return t.x},y:function(t){return t.y},showControls:!0,showValues:!0,transitionDuration:0,useInteractiveGuideline:!0,xAxis:{showMaxMin:!1},yAxis:{axisLabel:"Values"},margin:{top:20,right:20,bottom:60,left:65},zoom:{enabled:!0}}},this.calculate=function(e,r,a,n){var o=[],l=0,i={};return _.each(a.config.progs,function(t){i[t]=[]}),_.each(a.results,function(t,a){_.each(t,function(t){i[t.prog].push({x:e[a][r],y:t[n]})})}),_.each(a.config.progs,function(e){var r=function(t){return _.reduce(_.map(t,function(t){return t.y}),function(t,e){return t+e})/t.length},a=_.map(_.groupBy(i[e],"x"),function(t){return{x:t[0].x,y:r(t)}});o.push({values:_.sortBy(a,"x"),key:e,color:t.getColor(l,0)}),l++}),o}}r.$inject=["ColorService"],Object.defineProperty(e,"__esModule",{value:!0}),e.GraphResultsModelService=r},function(t,e){"use strict";function r(t){"ngInject";this.options={chart:{type:"scatterChart",height:450,x:function(t){return t.x},y:function(t){return t.y},scatter:{onlyCircles:!1},showDistX:!0,showDistY:!0}},this.calculate=function(e,r,a,n){var o=[],l=0,i={};return _.each(a.config.progs,function(t){i[t]=[]}),_.each(a.results,function(t,a){_.each(t,function(t){i[t.prog].push({x:e[a][r],y:t[n]})})}),_.each(a.config.progs,function(e){o.push({values:_.sortBy(_.sortBy(i[e],"y"),"x"),key:e,color:t.getColor(l,0)}),l++}),o}}r.$inject=["ColorService"],Object.defineProperty(e,"__esModule",{value:!0}),e.GraphResultsModelScatterService=r},function(t,e){"use strict";function r(t,e,r,a){"ngInject";return{templateUrl:"app/templates/view_graph.html",restrict:"E",scope:{graph:"@",result:"@"},controller:["$scope",function(t){var r=[{selector:"node",style:{"background-color":"#666",label:"data(id)"}},{selector:"edge[changed = 0]",style:{width:1,"line-color":"C0C0C0","target-arrow-color":"#ccc","target-arrow-shape":"triangle"}},{selector:"edge[changed > 0]",style:{width:1,"line-color":"#56C000","target-arrow-color":"#ccc","target-arrow-shape":"triangle"}},{selector:"edge[changed < 0]",style:{width:1,"line-color":"#C00000","target-arrow-color":"#ccc","target-arrow-shape":"triangle"}}];e.get(t.graph).then(function(n){e.get(t.result).then(function(t){cytoscape({container:document.getElementById("cy"),elements:a.makeEdges(n.data,t.data),style:r,layout:{name:"spread",minDist:20}})})})}]}}r.$inject=["$timeout","$http","$document","HelperService"],Object.defineProperty(e,"__esModule",{value:!0}),e.modGraph=r}]),angular.module("browserFree").run(["$templateCache",function(t){t.put("app/templates/compare.html",'<md-toolbar><div class="md-toolbar-tools"><md-button><ng-md-icon icon="home" ui-sref="home" aria-label="home"></ng-md-icon></md-button><h2>View Results</h2></div><md-tabs md-selected="currentTab"><md-tab id="tab{{id+1}}" aria-controls="tab{{id+1}}-content" ng-repeat="(id, result) in compareCtrl.results">{{result.name}}</md-tab><md-tab>All</md-tab></md-tabs></md-toolbar><div ng-if="!compareCtrl.results">None Selected</div><div ng-if="compareCtrl.results" layout-padding=""><md-tabs md-dynamic-height="" md-border-bottom="" md-selected="currentTab" class="noTabPanel"><md-tab label="{{result.start_time}}" ng-repeat="(id, result) in compareCtrl.results"><md-card><md-card-content><h2>Configuration</h2><table class="table table-striped table-hover"><tr><td>Config File</td><td>{{result.options.config}}</td></tr><tr><td>Instances</td><td>{{result.config.instances}}</td></tr><tr><td>Forbidden</td><td>{{result.config.forbidden}}</td></tr><tr><td>Seed</td><td>{{result.config.seed}}</td></tr><tr><td>Programms</td><td><span ng-repeat="prog in result.config.progs">{{prog}}</span></td></tr><tr><td>Maximum run time</td><td>{{result.config.max_time}}</td></tr><tr><td>Revison</td><td><a href="https://github.com/metaxy/f-free/commit/{{result.git_hash}}">{{result.commit_message}}</a></td></tr></table></md-card-content></md-card><md-card><md-card-content><h2>Statistics</h2><table class="table table-striped table-hover"><tr><th>Value</th><th ng-repeat="(prog,data) in result.stats">{{prog}}</th></tr><tr><td>Quality</td><td ng-repeat="(prog,data) in result.stats" ng-class="{max : data.quality == result.stats_quality_max}">{{data.quality*100 | number:1}} %</td></tr><tr><td>Failed Instances</td><td ng-repeat="(prog,data) in result.stats" ng-class="{max : data.failed == result.stats_failed_min}">{{data.failed}}</td></tr><tr><td>Failed in %</td><td ng-repeat="(prog,data) in result.stats" ng-class="{max : data.failed_percent == result.stats_failed_percent_min}">{{data.failed_percent | number:1}}%</td></tr><tr><td>Mean Time</td><td ng-repeat="(prog,data) in result.stats" ng-class="{max : data.mean_time == result.stats_mean_time_min}">{{data.time | number:2}}s</td></tr></table></md-card-content></md-card><md-card><md-card-content><md-input-container><label>Model</label><md-select ng-model="compareCtrl.graphs[id].x_key" ng-change="compareCtrl.recalculateOne(id)" aria-label="Select x"><md-option ng-repeat="value in compareCtrl.modelKeys" value="{{value}}">{{value}}</md-option></md-select></md-input-container><md-input-container><md-select ng-model="compareCtrl.graphs[id].y_key" ng-change="compareCtrl.recalculateOne(id)" aria-label="Select y"><md-option ng-repeat="value in compareCtrl.resultKeys" value="{{value}}">{{value}}</md-option></md-select></md-input-container><nvd3 options="compareCtrl.graphs[id].modelResult.options" data="compareCtrl.graphs[id].modelResult.data" config="{deepWatchData: false}" api="compareCtrl.graphs[id].modelResult.api"></nvd3><nvd3 options="compareCtrl.graphs[id].modelResultScatter.options" data="compareCtrl.graphs[id].modelResultScatter.data" config="{deepWatchData: false}" api="compareCtrl.graphs[id].modelResultScatter.api"></nvd3><nvd3 options="compareCtrl.graphs[id].modelResultBar.options" data="compareCtrl.graphs[id].modelResultBar.data" config="{deepWatchData: false}" api="compareCtrl.graphs[id].modelResultBar.api"></nvd3><md-card-content></md-card-content></md-card-content></md-card><md-card ng-if="compareCtrl.graphs[id].compare.data.length > 0"><md-card-content><md-input-container><label>Model</label><md-select ng-model="compareCtrl.graphs[id].compare.prog1" ng-change="compareCtrl.recalculateCompare(id)" aria-label="Select x"><md-option ng-repeat="value in result.config.progs" value="{{value}}">{{value}}</md-option></md-select></md-input-container><md-input-container><md-select ng-model="compareCtrl.graphs[id].compare.prog2" ng-change="compareCtrl.recalculateCompare(id)" aria-label="Select y"><md-option ng-repeat="value in result.config.progs" value="{{value}}">{{value}}</md-option></md-select></md-input-container><nvd3 options="compareCtrl.graphs[id].compare.options" data="compareCtrl.graphs[id].compare.data" api="compareCtrl.graphs[id].compare.api"></nvd3></md-card-content></md-card><md-card><md-card-content><h2>File</h2><table class="table table-striped table-hover"><tr><th>File</th><th ng-repeat="prog in ::result.config.progs">{{::prog}}</th><th>Action</th></tr><tr ng-repeat="(graph,runs) in ::result.results"><td>{{::graph}}</td><td ng-repeat="run in ::runs" ng-class="::{failed: run.k == -1}" ng-click="compareCtrl.showRun($event, run)">{{::run.metrics.absolut}} of {{::run.metrics.k_correct}} ({{::run.metrics.quality*100 | number:1}}%) in {{::run.time_log.user_time | number:2}}s</td><td><md-button aria-label="Compare Runs" ng-click="compareCtrl.compareRun($event, runs)"><ng-md-icon icon="compare"></ng-md-icon></md-button></td></tr></table></md-card-content></md-card></md-tab><md-tab label="All"><md-card><md-card-content><h2>Configuration</h2><table class="table table-striped table-hover"><tr><th>Value</th><th ng-repeat="(id, result) in ::compareCtrl.results">{{::result.start_time}}</th></tr><tr><td>Config File</td><td ng-repeat="(id, result) in ::compareCtrl.results">{{::result.options.config}}</td></tr><tr><td>Instances</td><td ng-repeat="(id, result) in ::compareCtrl.results">{{::result.config.instances}}</td></tr><tr><td>Forbidden</td><td ng-repeat="(id, result) in compareCtrl.results">{{result.config.forbidden}}</td></tr><tr><td>Seed</td><td ng-repeat="(id, result) in compareCtrl.results">{{result.config.seed}}</td></tr><tr><td>Programms</td><td ng-repeat="(id, result) in ::compareCtrl.results"><span ng-repeat="prog in ::result.config.progs">{{::prog}}</span></td></tr><tr><td>Maximum run time</td><td ng-repeat="(id, result) in ::compareCtrl.results">{{::result.config.max_time}}</td></tr><tr><td>Revison</td><td ng-repeat="(id, result) in ::compareCtrl.results"><a href="https://github.com/metaxy/f-free/commit/{{result.git_hash}}">{{result.commit_message}}</a></td></tr></table></md-card-content></md-card><md-card><md-card-content><h2>Results</h2><nvd3 options="::compareCtrl.optionsProgCompare" data="::compareCtrl.dataOptionsProgCompare"></nvd3></md-card-content></md-card></md-tab></md-tabs></div>'),t.put("app/templates/compare_run.html",'<md-dialog ng-cloak=""><md-content><md-card><md-card-content><h2>Time Info</h2><table class="table table-striped table-hover"><tr><th>Value</th><th ng-repeat="item in dialogCtrl.items">{{item.prog}}</th></tr><tr ng-repeat="(title,data) in dialogCtrl.items[0].time_log track by $index"><td>{{title}}</td><td ng-repeat="item in dialogCtrl.items">{{item.time_log[title]}}</td></tr></table></md-card-content></md-card><md-card><md-card-content><h2>Debug Info</h2><table class="table table-striped table-hover"><tr><th>Value</th><th ng-repeat="item in dialogCtrl.items">{{item.prog}}</th></tr><tr ng-repeat="(title,data) in dialogCtrl.items[0].debug_out"><td>{{title}}</td><td ng-repeat="item in dialogCtrl.items">{{item.debug_out[title]}}</td></tr></table></md-card-content></md-card><md-card ng-repeat="item in dialogCtrl.items" ng-if="item.log_output"><md-card-content><h2>Log Output of {{item.prog}}</h2><pre>\n        {{item.log_output}}\n        </pre></md-card-content></md-card></md-content></md-dialog>'),t.put("app/templates/main.html",'<md-toolbar><div class="md-toolbar-tools"><h2>List of recent benchmarks</h2><md-button class="md-raised md-accent" ng-click="mainCtrl.compare()">Compare them</md-button><md-button class="md-raised md-accent" ng-click="mainCtrl.overview()">Overview</md-button></div></md-toolbar><md-list ng-cloak=""><md-list-item ng-repeat="item in mainCtrl.benchmarks | orderBy:\'-time\'"><h3>{{ item.time }}</h3><span class="forbidden-chip">{{item.forbidden.split(\'/\').reverse()[0]}}</span> <span class="instances-chip">{{item.instances.split(\'/\').reverse()[0]}}</span><p><span class="prog-chip" ng-repeat="prog in item.progs">{{prog}}</span></p><md-checkbox class="md-secondary" ng-model="item.selected"></md-checkbox></md-list-item></md-list>'),t.put("app/templates/overview.html",'<md-toolbar><div class="md-toolbar-tools"><md-button><ng-md-icon icon="home" ui-sref="home" aria-label="home"></ng-md-icon></md-button><h2>Overview</h2></div></md-toolbar><div ng-if="!ctrl.results">None Selected</div><div ng-if="ctrl.results" layout-padding=""><table class="table table-striped table-hover"><tr><th>Quality (mean)</th><th ng-repeat="prog in ::ctrl.results[0].config.progs">{{::prog}}</th></tr><tr ng-repeat="result in ::ctrl.results"><td>{{::result.name}}</td><td ng-repeat="prog in ::ctrl.results[0].config.progs" ng-class="{max : result.stats[prog].quality == result.stats_quality_max}">{{::result.stats[prog].quality*100 | number:1}} %</td></tr></table><table class="table table-striped table-hover"><tr><th>Absolut (mean)</th><th ng-repeat="prog in ::ctrl.results[0].config.progs">{{::prog}}</th></tr><tr ng-repeat="result in ::ctrl.results"><td>{{::result.name}}</td><td ng-repeat="prog in ::ctrl.results[0].config.progs" ng-class="{max : result.stats[prog].quality == result.stats_quality_max}">{{::result.stats[prog].absolut}}</td></tr></table><table class="table table-striped table-hover"><tr><th>Has the best of all</th><th ng-repeat="prog in ::ctrl.results[0].config.progs">{{::prog}}</th></tr><tr ng-repeat="result in ::ctrl.results"><td>{{::result.name}}</td><td ng-repeat="prog in ::ctrl.results[0].config.progs">{{::result.stats[prog].winning}}</td></tr></table><table class="table table-striped table-hover"><tr><th>Benchmark of Failed</th><th ng-repeat="prog in ::ctrl.results[0].config.progs">{{::prog}}</th></tr><tr ng-repeat="result in ::ctrl.results"><td>{{::result.name}}</td><td ng-repeat="prog in ::ctrl.results[0].config.progs" ng-class="{max : result.stats[prog].failed == result.stats_failed_min}">{{::result.stats[prog].failed}}</td></tr></table><table class="table table-striped table-hover"><tr><th>Benchmark of Mean Time</th><th ng-repeat="prog in ::ctrl.results[0].config.progs">{{::prog}}</th></tr><tr ng-repeat="result in ::ctrl.results"><td>{{::result.name}}</td><td ng-repeat="prog in ::ctrl.results[0].config.progs" ng-class="{max : result.stats[prog].mean_time == result.stats_mean_time_min}">{{::result.stats[prog].time | number:2}} s</td></tr></table></div>'),t.put("app/templates/show_run.html",'<md-dialog ng-cloak=""><md-content><md-card class="cy-container"><md-card-content class="cy-container"><mod-graph graph="{{dialogCtrl.item.model_file_name}}" result="{{dialogCtrl.item.result_file_name}}"></mod-graph></md-card-content></md-card><md-card><md-card-content><h2>General Info</h2><table class="table table-striped table-hover"><tr><td>Prog</td><td>{{dialogCtrl.item.prog}}</td></tr><tr><td>Graph</td><td>{{dialogCtrl.item.graph}}</td></tr><tr><td>K</td><td>{{dialogCtrl.item.metrics.absolut}}</td></tr><tr><td>K-Correct</td><td>{{dialogCtrl.item.metrics.k_correct}}</td></tr><tr><td>Time</td><td>{{dialogCtrl.item.time | number: 2}}s</td></tr><tr><td>Qualitiy</td><td>{{dialogCtrl.item.metrics.quality | number:1}}%</td></tr><tr><td>Distance</td><td>{{dialogCtrl.item.metrics.distance}}</td></tr><tr><td>Simple Command</td><td>{{dialogCtrl.item.simple_command}}</td></tr><tr><td>Result Command</td><td>{{dialogCtrl.item.result_file_name}}</td></tr></table></md-card-content></md-card><md-card><md-card-content><h2>Time Info</h2><table class="table table-striped table-hover"><tr ng-repeat="(title,data) in dialogCtrl.item.time_log"><td>{{title}}</td><td>{{data}}</td></tr></table></md-card-content></md-card><md-card><md-card-content><h2>Debug Info</h2><table class="table table-striped table-hover"><tr ng-repeat="(title,data) in dialogCtrl.item.debug_out"><td>{{title}}</td><td>{{data}}</td></tr></table></md-card-content></md-card><md-card ng-if="dialogCtrl.item.log_output"><md-card-content><h2>Log Output</h2><pre>\n        {{dialogCtrl.item.log_output}}\n        </pre></md-card-content></md-card></md-content></md-dialog>'),t.put("app/templates/view_graph.html",'<div id="cy"></div>')}]);
//# sourceMappingURL=../maps/scripts/app-2f3fe0cb6c.js.map
