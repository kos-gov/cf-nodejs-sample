// app-specific environment variables
// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
var isEmpty = function(value) {
    if (
        value == "" ||
        value == null ||
        value == undefined ||
        (value != null && typeof value == "object" && !Object.keys(value).length)
    ) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    get_app_name: function() {
        if (process.env.VCAP_APPLICATION) {
            var app_info = JSON.parse(process.env.VCAP_APPLICATION);
            console.log("app_info: " + JSON.stringify(app_info));
            console.log("app_info.name: " + app_info.name);
            return app_info.name;
        }
    },

    get_app_uris: function() {
        if (process.env.VCAP_APPLICATION) {
            var app_info = JSON.parse(process.env.VCAP_APPLICATION);
            if (!isEmpty(app_info.uris)) {
                if (Array.isArray(app_info.uris)) {
                    if (typeof app_info.uris.join) {
                        console.log("app_info.name: " + app_info.uris.join(", "));
                        return app_info.uris.join(", ");
                    } else {
                        var uri;
                        for (i = 0; i < app_info.uris.length; i++) {
                            if ((i = 0)) {
                                uri = app_info.uris[0];
                            } else {
                                uri += ", " + app_info.uris[i];
                            }
                        }
                        console.log("app_info.name: " + uri);
                        return uri;
                    }
                } else {
                    console.log("app_info.name: " + app_info.uris);
                    return app_info.uris;
                }
            } else {
                console.log("app_info.uris: undefined");
            }
        }
    },

    get_app_space: function() {
        if (process.env.VCAP_APPLICATION) {
            var app_info = JSON.parse(process.env.VCAP_APPLICATION);
            console.log("app_info.space_name: " + app_info.space_name);
            return app_info.space_name;
        }
    },

    get_app_index: function() {
        var app_index = 0;
        if (process.env.INSTANCE_INDEX) {
            index = process.env.INSTANCE_INDEX;
        }
        console.log("app_info.app_index: " + app_index);
        return app_index;
    },

    get_app_mem_limits: function() {
        if (process.env.VCAP_APPLICATION) {
            var app_info = JSON.parse(process.env.VCAP_APPLICATION);

            if (!isEmpty(app_info.limits)) {
                if (app_info.limits.mem == "" || app_info.limits.mem == null) {
                    console.log("app_info.limits.mem: null");
                    return "";
                }
                if (app_info.limits.mem) {
                    console.log("app_info.limits.mem: " + app_info.limits.mem);
                    return app_info.limits.mem;
                }
            } else {
                console.log("app_info.limits.mem: undefined");
            }
        }
    },

    get_app_disk_limits: function() {
        if (process.env.VCAP_APPLICATION) {
            var app_info = JSON.parse(process.env.VCAP_APPLICATION);

            if (!isEmpty(app_info.limits)) {
                if (app_info.limits.disk == "" || app_info.limits.disk == null) {
                    console.log("app_info.limits.disk: null");
                    return "";
                }
                if (app_info.limits.disk) {
                    console.log("app_info.limits.disk: " + app_info.limits.disk);
                    return app_info.limits.disk;
                }
            } else {
                console.log("app_info.limits.disk: undefined");
            }
        }
    },
};