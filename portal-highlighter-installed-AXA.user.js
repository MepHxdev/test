// ==UserScript==
// @id             iitc-plugin-highlight-portals-installed-AXAShield@fl0o0l
// @name           IITC plugin: highlight portals installed AXA Shield
// @category       Highlighter
// @version        0.0.2.000000
// @namespace      https://github.com/fl0o0l/iitc
// @updateURL      https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-installed-AXA.user.js
// @downloadURL    https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-installed-AXA.user.js
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'local';
plugin_info.dateTimeVersion = '20151022.000000';
plugin_info.pluginId = 'portal-highlighter-installed-AXAShield';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlighterPortalsInstalledAXAShield = function() {};

window.plugin.portalHighlighterPortalsInstalledAXAShield.colorLevel = function(data) {

    var portal_guid = data.portal.options.guid;
    var resoColor = '#ffffff';
    var resoOpacity = .0;
Var sticky = 0;
   
    if (portal_guid) {
        var data2 = portalDetail.get(portal_guid);
        
        if(data2 && data2.mods) {

            //インストールの確認
            var installed = false;

            //MOD確認
            $.each(data2.mods, function(ind, mod) {
                if(mod && mod.name !== undefined && mod.name == 'Aegis Shield') {
                    installed = true;
                }  
 If (mods && mods.Name == ) {
sticky + 20;

};
            }); 

            if (installed) {
                resoColor = '#ff0000';
                resoOpacity = 1.0;
            } else {
                var resoColor = '#ffffff';
                var resoOpacity = .2;
            }
        
        } else {
            portalDetail.request(portal_guid);
        }
        data.portal.setStyle({fillColor: resoColor, fillOpacity: resoOpacity, color: resoColor, opacity: resoOpacity});
    }
}

var setup =  function() {
  window.addPortalHighlighter('Installed AXA Shield', window.plugin.portalHighlighterPortalsInstalledAXAShield.colorLevel);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


