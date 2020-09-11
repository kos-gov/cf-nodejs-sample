// app-bound services environment variables
module.exports = {
    get_service_label: function() {
        if (process.env.VCAP_SERVICES) {
            var svc_info = JSON.parse(process.env.VCAP_SERVICES);
            for (var key in svc_info) {
                var svcs = svc_info[key];
                for (var index in svcs) {
                    var label = svcs[index].label;
                    console.log("svc_info.label: " + label);
                    return label;
                }
            }
        }
    },
    get_service_name: function() {
        if (process.env.VCAP_SERVICES) {
            var svc_info = JSON.parse(process.env.VCAP_SERVICES);
            for (var label in svc_info) {
                var svcs = svc_info[label];
                for (var index in svcs) {
                    var name = svcs[index].name;
                    console.log("svc_info.name: " + name);
                    return name;
                }
            }
        }
    },
    get_service_plan: function() {
        if (process.env.VCAP_SERVICES) {
            var svc_info = JSON.parse(process.env.VCAP_SERVICES);
            for (var label in svc_info) {
                var svcs = svc_info[label];
                for (var index in svcs) {
                    var plan = svcs[index].plan;
                    console.log("svc_info.plan: " + plan);
                    return plan;
                }
            }
        }
    },
};