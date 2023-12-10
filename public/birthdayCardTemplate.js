(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['birthdayCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"bday-card-box\" data-value="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":38},"end":{"line":1,"column":44}}}) : helper)))
    + ">\n    <div class=\"bday-card-inner\">\n        <div class=\"front\" style=\"background: url("
    + alias4(((helper = (helper = lookupProperty(helpers,"img_url") || (depth0 != null ? lookupProperty(depth0,"img_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_url","hash":{},"data":data,"loc":{"start":{"line":4,"column":50},"end":{"line":4,"column":61}}}) : helper)))
    + "); background-size: cover; background-position: center;\">\n            <scan class=\"bday-name-box\">\n                <!-- Bday Card Name-->\n                <h2 class=\"bday-name\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":28}}}) : helper)))
    + "\n                </h2>\n            </scan>\n            <!-- Bday Card Info-->\n            <scan class=\"bday-info-box\">\n                <h3 class=\"bday-age\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"age") || (depth0 != null ? lookupProperty(depth0,"age") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"age","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":27}}}) : helper)))
    + " years old,\n                </h3>\n                <h3 class=\"bday-date\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":17,"column":20},"end":{"line":17,"column":28}}}) : helper)))
    + "\n                </h3>\n            </scan>\n            <!-- Bday Card Buttons-->\n            <scan class=\"bday-btn-box\">\n                <button class=\"bday-card-gift\">Generate Gift</button>\n                <button class=\"bday-card-edit\">Edit</button>\n                <button class=\"bday-card-delete\">Delete</button>\n            </scan>\n        </div>\n\n\n    </div>\n</div>";
},"useData":true});
})();