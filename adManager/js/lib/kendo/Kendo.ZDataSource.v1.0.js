var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var kendoExtension;
(function (kendoExtension) {
    var ZDataSourceConfig = (function () {
        function ZDataSourceConfig() {
        }
        ZDataSourceConfig.ServiceInit = function (baseService) {
            document["serviceURL"] = baseService;
        };
        ZDataSourceConfig.ServiceSelect = function (resource) {
            return document["serviceURL"] + "/resource/" + resource;
        };
        ZDataSourceConfig.ServiceCreate = function (resource) {
            return this.ServiceSelect(resource) + "/create";
        };
        ZDataSourceConfig.ServiceDestroy = function (resource) {
            return this.ServiceSelect(resource) + "/destroy";
        };
        ZDataSourceConfig.ServiceUpdate = function (resource) {
            return this.ServiceSelect(resource) + "/update";
        };
        ZDataSourceConfig.ServiceSTokenOffset = function (value) {
            if (value) {
                document["ServiceSTokenOffset"] = value;
            }
            return document["ServiceSTokenOffset"] || 0;
        };
        ZDataSourceConfig.ServiceSTokenKey = function (value) {
            if (value) {
                document["ServiceSTokenKey"] = value;
            }
            return document["ServiceSTokenKey"] || "";
        };
        return ZDataSourceConfig;
    }());
    kendoExtension.ZDataSourceConfig = ZDataSourceConfig;
    var ZDataSource = (function (_super) {
        __extends(ZDataSource, _super);
        function ZDataSource(options) {
            var _this = this;
            var context;
            var cResource = options["resource"] || "";
            var cFieldDef = options["fieldDef"] || "";
            var cKeyCol = options["keyCol"] || "";
            var lSyncCall = options["syncCall"] || false;
            var lcallRead = options["callRead"] || false;
            var lstopRead = options["stopRead"] || false;
            var cbaseAuthUser = options["baseAuthUser"] || "";
            var cbaseAuthPass = options["baseAuthPass"] || "";
            var oaddData = options["extraData"] || {};
            var cAuthorization = "";
            if (cbaseAuthUser !== "" && cbaseAuthPass !== "") {
                cAuthorization = "Basic " + context.localBase64Encode(cbaseAuthUser + ":" + cbaseAuthPass);
            }
            var lSecurityTokenEnabled = options["SecurityTokenEnabled"] || true;
            var tipo;
            var aFields = {};
            var campiDef = cFieldDef.split(",");
            for (var x = 0; x < campiDef.length; x++) {
                var campiParts = campiDef[x].split(":");
                if (campiParts.length > 1) {
                    switch (campiParts[1].toUpperCase().trim()) {
                        case "C":
                            tipo = "string";
                            break;
                        case "D":
                            tipo = "date";
                            break;
                        case "N":
                            tipo = "number";
                            break;
                        case "L":
                            tipo = "boolean";
                            break;
                        default:
                            tipo = "string";
                            if (campiParts[1].toUpperCase() !== "") {
                                alert("DataSource.Create: Campo " + campiDef[x] + " tipo non valido: [" + campiParts[1].toUpperCase() + "]");
                            }
                            break;
                    }
                }
                else {
                    tipo = "string";
                }
                aFields[campiParts[0].trim()] = { type: tipo, nullable: true, defaultValue: null };
            }
            var oDataSourceConfig = {
                transport: {
                    read: {
                        async: !lSyncCall,
                        type: "POST",
                        url: ZDataSourceConfig.ServiceSelect(cResource),
                        beforeSend: function (request) {
                            if (cAuthorization !== "") {
                                request.setRequestHeader("Authorization", cAuthorization);
                            }
                        }
                    },
                    create: {
                        async: !lSyncCall,
                        type: "POST",
                        url: ZDataSourceConfig.ServiceCreate(cResource),
                        beforeSend: function (request) {
                            if (cAuthorization !== "") {
                                request.setRequestHeader("Authorization", cAuthorization);
                            }
                        }
                    },
                    destroy: {
                        async: !lSyncCall,
                        type: "POST",
                        url: ZDataSourceConfig.ServiceDestroy(cResource),
                        beforeSend: function (request) {
                            if (cAuthorization !== "") {
                                request.setRequestHeader("Authorization", cAuthorization);
                            }
                        }
                    },
                    update: {
                        async: !lSyncCall,
                        type: "POST",
                        url: ZDataSourceConfig.ServiceUpdate(cResource),
                        beforeSend: function (request) {
                            if (cAuthorization !== "") {
                                request.setRequestHeader("Authorization", cAuthorization);
                            }
                        }
                    },
                    parameterMap: function (data, type) {
                        var payLoad;
                        if ($.isFunction(oaddData))
                            payLoad = oaddData();
                        else
                            payLoad = oaddData;
                        var extData = $.extend(true, data, payLoad);
                        if (lSecurityTokenEnabled) {
                            extData["sToken"] = context.sToken();
                        }
                        if (["create", "update", "destroy"].indexOf(type) >= 0) {
                            extData = context.convertNull(extData);
                        }
                        if (options["parameterMap"]) {
                            if ($.isFunction(options.parameterMap)) {
                                extData = options.parameterMap(extData, type);
                            }
                        }
                        return extData;
                    }
                },
                serverFiltering: true,
                serverPaging: true,
                serverSorting: true,
                batch: false,
                pageSize: 20,
                schema: {
                    data: "data",
                    total: "total",
                    model: {
                        id: cKeyCol,
                        fields: aFields
                    },
                    parse: function (response) {
                        var responseData = response;
                        if (options["parse"]) {
                            if ($.isFunction(options.parse)) {
                                responseData = options.parse(responseData);
                            }
                        }
                        return responseData;
                    }
                },
                error: function (e) {
                    if (e.hasOwnProperty("status") && e.status == "error") {
                        $("<div></div>").kendoAlert({
                            title: "Errore servizio remoto",
                            content: "<div style=\"font-size: medium; min-width: 350px; color: red\";> Errore: " + e.errorThrown + "<br>Status: " + e.xhr.status + "</div>"
                        }).data("kendoAlert").open();
                    }
                    else {
                        $("<div></div>").kendoAlert({
                            title: "Errore servizio remoto",
                            content: "<div style=\"font-size: medium; min-width: 350px; color: red;\"> Errore: " + e.errors + "</span>"
                        }).data("kendoAlert").open();
                    }
                    if (options["error"]) {
                        if ($.isFunction(options.error)) {
                            options.error(e);
                        }
                    }
                },
                requestEnd: function (e) {
                    if (e.type === "destroy" && e.response.errors) {
                        this.cancelChanges();
                    }
                    if (options["requestEnd"]) {
                        if ($.isFunction(options.requestEnd)) {
                            options.requestEnd(e);
                        }
                    }
                },
                change: function (e) {
                    if (options["change"]) {
                        if ($.isFunction(options.change)) {
                            options.change(e);
                        }
                    }
                },
                push: function (e) {
                    if (options["push"]) {
                        if ($.isFunction(options.push)) {
                            options.push(e);
                        }
                    }
                },
                sync: function (e) {
                    if (options["sync"]) {
                        if ($.isFunction(options.sync)) {
                            options.sync(e);
                        }
                    }
                },
                requestStart: function (e) {
                    if (lstopRead) {
                        e.preventDefault();
                    }
                    if (options["requestStart"]) {
                        if ($.isFunction(options.requestStart)) {
                            options.requestStart(e);
                        }
                    }
                }
            };
            $.extend(true, oDataSourceConfig, options);
            _this = _super.call(this, oDataSourceConfig) || this;
            context = _this;
            context.parametersOptions = options;
            if (lcallRead) {
                context.read();
            }
            return _this;
        }
        ZDataSource.prototype.convertNull = function (data) {
            if (typeof data === "object") {
                for (var propt in data) {
                    if (data[propt] == null || data[propt] === "") {
                        data[propt] = "NULL";
                    }
                }
            }
            if (data instanceof Array) {
                for (var record in data) {
                    for (var propt in record) {
                        if (record[propt] == null || data[propt] === "") {
                            record[propt] = "NULL";
                        }
                    }
                }
            }
            return data;
        };
        ZDataSource.prototype.sToken = function () {
            return eval("eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c])}}return p}('56();24 61(10){9 25=\"59+/=\";9 11=\"\";9 13,5,7,41,49,34,27;9 28=0;10=58(10);73(28<10.21){13=10.31(28++);5=10.31(28++);7=10.31(28++);41=13>>2;49=(13&3)<<4|5>>4;34=(5&15)<<2|7>>6;27=7&63;36(65(5)){34=27=64}45 36(65(7)){27=64}11=11+25.30(41)+25.30(49)+25.30(34)+25.30(27)}29 11}24 58(10){10=10.69(/\\\\5\\\\13/68,\"\\\\13\");9 11=\"\";50(9 13=0;13<10.21;13++){9 5=10.31(13);36(5<33){11+=23.20(5)}45 36(5>70&&5<71){11+=23.20(5>>6|72);11+=23.20(5&63|33)}45{11+=23.20(5>>12|67);11+=23.20(5>>6&63|33);11+=23.20(5&63|33)}}29 11}24 66(60){9 42=\\'59\\';9 48=\\'\\';50(9 7=0;7<60;7++){9 38=57.77(57.88()*42.21);48+=42.87(38,38+1)}29 48}24 55(51,32,39){29(51<=32.21)?32:55(51,32+39,39)}24 56(){9 35,14,40,47,53,43,52,54,37,19,17,44,46;35=\"\";14=86 74();40=(\"90\"+14.89()).18(-3);47=(\"26\"+14.92()).18(-2);53=(\"26\"+14.91()).18(-2);43=(\"26\"+14.85()).18(-2);52=(\"26\"+14.84()).18(-2);54=(\"26\"+(14.78()+1)).18(-2);37=(\"76\"+14.75()).18(-4);19=(\"79\"+62.80().83(16).82()).18(-8);46=62.81();17=47+19.22(0,2)+37.22(0,2)+43+19.22(2,2)+40+19.22(4,2)+37.22(2,2)+19.22(6,2)+54+53+52+46;17=61(17);44=66(17.21);50(9 7=0;7<17.21;7++){35+=(17[7]==\"=\")?\"=\"+17[7]:44[7]+17[7]}29 35}',10,93,'|||||r||i||var|e|t||n|dtc|||p9|slice|p8|fromCharCode|length|substr|String|function|_keyStr|00|a|f|return|charAt|charCodeAt|string|128|u|ret|if|p7|rp|padding|p1|s|cS|p4|p10|else|p11|p2|rs|o|for|width|p5|p3|p6|pad|sToken|Math|_utf8_encode|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|len|EncodeToken|ZDataSourceConfig|||isNaN|stringPack|224|g|replace|127|2048|192|while|Date|getFullYear|0000|floor|getMonth|00000000|ServiceSTokenOffset|ServiceSTokenKey|toUpperCase|toString|getDate|getHours|new|substring|random|getMilliseconds|000|getMinutes|getSeconds'.split('|'),0,{}))");
        };
        ZDataSource.prototype.localBase64Encode = function (input_str) {
            if (/([^\u0000-\u00ff])/.test(input_str))
                throw Error('String must be ASCII');
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c;
            c = input_str.length % 3;
            if (c > 0) {
                while (c++ < 3) {
                    pad += '=';
                    input_str += '\0';
                }
            }
            for (c = 0; c < input_str.length; c += 3) {
                o1 = input_str.charCodeAt(c);
                o2 = input_str.charCodeAt(c + 1);
                o3 = input_str.charCodeAt(c + 2);
                bits = o1 << 16 | o2 << 8 | o3;
                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;
                e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            }
            input_str = e.join('');
            input_str = input_str.slice(0, input_str.length - pad.length) + pad;
            return input_str;
        };
        return ZDataSource;
    }(kendo.data.DataSource));
    kendoExtension.ZDataSource = ZDataSource;
})(kendoExtension || (kendoExtension = {}));
