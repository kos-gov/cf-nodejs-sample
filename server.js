var express = require("express");
var app = express();

var fs = require("fs");

var fileName = "jcap_app.json";
if (!process.env.VCAP_APPLICATION) {
    var cfapp = fs.readFileSync(fileName, "utf8");
    var app_json = JSON.parse(cfapp);
    if (app_json.VCAP_APPLICATION != undefined) {
        process.env.VCAP_APPLICATION = JSON.stringify(app_json.VCAP_APPLICATION);
    } else {
        process.env.VCAP_APPLICATION = cfapp;
    }
}

fileName = "jcap_services.json";
if (!process.env.VCAP_SERVICES) {
    var cfsvc = fs.readFileSync(fileName, "utf8");
    var svc_json = JSON.parse(cfsvc);
    if (svc_json.VCAP_SERVICES != undefined) {
        process.env.VCAP_SERVICES = JSON.stringify(svc_json.VCAP_SERVICES);
    } else {
        process.env.VCAP_SERVICES = cfsvc;
    }
}

console.log("vcap_app: " + process.env.VCAP_APPLICATION);
console.log("vcap_svc: " + process.env.VCAP_SERVICES);

var cf_app = require("./app/vcap_application");
var cf_svc = require("./app/vcap_services");

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("pages/index", {
        app_environment: app.settings.env,
        application_name: cf_app.get_app_name(),
        app_uris: cf_app.get_app_uris(),
        app_space_name: cf_app.get_app_space(),
        app_index: cf_app.get_app_index(),
        app_mem_limits: cf_app.get_app_mem_limits(),
        app_disk_limits: cf_app.get_app_disk_limits(),
        service_label: cf_svc.get_service_label(),
        service_name: cf_svc.get_service_name(),
        service_plan: cf_svc.get_service_plan(),
    });
});

app.listen(process.env.PORT || 4040);
