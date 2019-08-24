import Vue from "vue"
import Component from "vue-class-component"
import {RawLocation} from "vue-router"
import {router} from "../router"

import * as template from "text!./home.html"
import { buildUrl } from "../api/helpers";
import { store } from "../store";
@Component({
    template
})
export default class HomeView extends Vue {
    navigate(name: string, opts?: RawLocation) {
        if (~name.indexOf("://")) return window.open(name, "_blank")
        router.push(Object.assign({
            name
        }, opts))
    }

    fileList: any[] = [];

    get uploadUrl() {
        return buildUrl(store.state.api, "/api/v1/wordcount");
    }

    handleUpload(file) {
        const isTextfile = file.type === "text/plain";

        if (!isTextfile)
            (<any>this).$message.error("You must provide a text file");

        return isTextfile;
    }
}