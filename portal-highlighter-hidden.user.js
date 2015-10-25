// ==UserScript==
// @id             iitc-plugin-highlight-hidden-portals@fl0o0l
// @name           IITC plugin: highlight hidden portals
// @category       Highlighter
// @version        0.0.1.20151022.000000
// @namespace      https://github.com/fl0o0l/iitc
// @updateURL      https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-hidden.user.js
// @downloadURL    https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-hidden.user.js
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
plugin_info.pluginId = 'portal-highlighter-hidden-portals';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlighterHiddenPortals = function() {};

window.plugin.portalHighlighterHiddenPortals.colorLevel = function(data) {

    var portal_guid = data.portal.options.guid;
    var resoColor = '#ffffff';
    var resoOpacity = .0;
   
    if (portal_guid) {
        var data2 = portalDetail.get(portal_guid);
        //インストールの確認
        var installedAXA = false;
        var installedVRPS = false;
        var installedRPS = false;
        
        if(data2 && data2.mods && data2.resonators) {
            //MOD確認
            $.each(data2.mods, function(ind, mod) {
                if(mod && mod.name !== undefined && mod.name == 'AXA Shield') {
                    installedAXA = true;
                }
                if(mod && mod.name !== undefined && mod.name == 'Portal Shield' && mod.rarity == 'VERY_RARE') {
                    installedVRPS = true;
                }
                if(mod && mod.name !== undefined && mod.name == 'Portal Shield' && mod.rarity == 'RARE') {
                    installedRPS = true;
                }
            }); 

            if (data2.resonators.length <= 2 && (installedAXA || installedVRPS || installedRPS)) {
                //レゾネーターが2つ以下で、RPS以上のMODがインストールされているポータル
                resoColor = '#ff0000';
                resoOpacity = 1.0;
            } else if (data2.resonators.length <= 7 && (installedAXA || installedVRPS || installedRPS)) {
                //レゾネーターが7つ以下で、RPS以上のMODがインストールされているポータル
                resoColor = '#ff8c00';
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
  window.addPortalHighlighter('Hidden Portals Installed RPS over', window.plugin.portalHighlighterHiddenPortals.colorLevel);
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

