// ==UserScript==
// @id             iitc-plugin-highlight-portals-Virus-is-used@fl0o0l
// @name           IITC plugin: highlight portals Virus is used
// @category       Highlighter
// @version        0.0.1.20151025.000004
// @namespace      https://github.com/fl0o0l/iitc
// @updateURL      https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-Virus-is-used.user.js
// @downloadURL    https://github.com/fl0o0l/iitc/raw/master/portal-highlighter-Virus-is-used.user.js
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
plugin_info.dateTimeVersion = '20151025.000004';
plugin_info.pluginId = 'portal-highlighter-Virus-is-used';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlighterPortalsVirusIsUsed = function() {};

window.plugin.portalHighlighterPortalsVirusIsUsed.colorLevel = function(data) {

    var portal_guid = data.portal.options.guid;
    var resoColor = '#ffffff';
    var resoOpacity = 0.0;
    var portal_level = data.portal.options.level;
    
    //MODリスト
    var MOD_LIST = ["VERY_RARE/AXA Shield"
                   ,"VERY_RARE/Portal Shield"
                   ,"RARE/Portal Shield"
                   ,"Common/Portal Shield"
                   ,"VERY_RARE/Heat Sink"
                   ,"RARE/Heat Sink"
                   ,"Commoin/Heat Sink"
                   ,"VERY_RARE/Multi-hack"
                   ,"RARE/Multi-hack"
                   ,"Common/Multi-hack"
                   ,"RARE/Link Amp"
                   ,"VERY_RARE/SoftBank Ultra Link"
                   ,"RARE/Force Amp"
                   ,"RARE/Turret"];

    //スコアー表
    var MOD_SCORE = {};
    MOD_SCORE['VERY_RARE/AXA Shield'] = 0;
    MOD_SCORE['VERY_RARE/Portal Shield'] = 0;
    MOD_SCORE['RARE/Portal Shield'] = 0;
    MOD_SCORE['Common/Portal Shield'] = 0;
    MOD_SCORE['VERY_RARE/Heat Sink'] = 0;
    MOD_SCORE['RARE/Heat Sink'] = 0;
    MOD_SCORE['Commoin/Heat Sink'] = 0;
    MOD_SCORE['VERY_RARE/Multi-hack'] = 0;
    MOD_SCORE['RARE/Multi-hack'] = 0;
    MOD_SCORE['Common/Multi-hack'] = 0;
    MOD_SCORE['RARE/Link Amp'] = 0;
    MOD_SCORE['VERY_RARE/SoftBank Ultra Link'] = 0;
    MOD_SCORE['RARE/Force Amp'] = 0;
    MOD_SCORE['RARE/Turret'] = 0;
    
    //スコアー表
    var MOD_SCORE_BY_OWNER = {};
    MOD_SCORE_BY_OWNER['VERY_RARE/AXA Shield'] = 49;
    MOD_SCORE_BY_OWNER['VERY_RARE/Portal Shield'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Portal Shield'] = 49;
    MOD_SCORE_BY_OWNER['Common/Portal Shield'] = 49;
    MOD_SCORE_BY_OWNER['VERY_RARE/Heat Sink'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Heat Sink'] = 49;
    MOD_SCORE_BY_OWNER['Commoin/Heat Sink'] = 49;
    MOD_SCORE_BY_OWNER['VERY_RARE/Multi-hack'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Multi-hack'] = 49;
    MOD_SCORE_BY_OWNER['Common/Multi-hack'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Link Amp'] = 49;
    MOD_SCORE_BY_OWNER['VERY_RARE/SoftBank Ultra Link'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Force Amp'] = 49;
    MOD_SCORE_BY_OWNER['RARE/Turret'] = 49;
    
    if (portal_guid) {
        var data2 = portalDetail.get(portal_guid);
        
        if(data2 && data2.mods) {

            //インストールの確認
            var installedMod = {};
            var installedModByOwner = {};
            var Score = 0;
            var modName = '';

            //MOD確認
            $.each(data2.mods, function(ind, mod) {
                if(mod && mod.name !== undefined) {
                    modName = mod.rarity + '/' + mod.name;
                    //Modカウント
                    if(!installedMod[modName]) {
                        installedMod[modName] = 0;
                    }
                    installedMod[modName]++;
                }
                if(mod && mod.name !== undefined && data2.owner == mod.owner) {
                    modName = mod.rarity + '/' + mod.name;
                    //OwnerがインストールしたModカウント
                    if(!installedModByOwner[modName]) {
                        installedModByOwner[modName] = 0;
                    }
                    installedModByOwner[modName]++;
                }
            }); 

            //スコアー計算
            $.each(MOD_LIST, function(ind, mod) {

                if(installedMod[mod]) {
                    Score += installedMod[mod] * MOD_SCORE[mod];
                }

                if(installedModByOwner[mod]) {
                    Score += installedModByOwner[mod] * MOD_SCORE_BY_OWNER[mod];
                }

            }); 
            
            //敵陣営が反転
            if(data2.owner == '__JARVIS__' || data2.owner == '__ADA__') {
                Score += 1000;
            }

            if (Score > 196) {
                resoColor = '#ff0000';
                resoOpacity = 1.0;
            } else if (Score >= 147) {
                resoColor = '#ff8c00';
                resoOpacity = 1.0;
            } else {
                resoColor = '#ffffff';
                resoOpacity = 0.2;
            }
        
        } else {
            portalDetail.request(portal_guid);
        }
        data.portal.setStyle({fillColor: resoColor, fillOpacity: resoOpacity, color: resoColor, opacity: resoOpacity});
    }
};

var setup =  function() {
  window.addPortalHighlighter('virus is used', window.plugin.portalHighlighterPortalsVirusIsUsed.colorLevel);
};

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

