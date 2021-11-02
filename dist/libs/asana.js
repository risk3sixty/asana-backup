"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const axios_1 = __importDefault(require("axios"));
function AsanaClient(accessToken = process.env.ASANA_ACCESS_TOKEN) {
    assert_1.default(accessToken, 'asana access token not provided');
    return {
        client: axios_1.default.create({
            baseURL: `https://app.asana.com/api/1.0`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }),
        async getWorkspaces() {
            const { data: { data }, } = await this.client.get('/workspaces');
            return data;
        },
        async getFullExport(orgId) {
            const { data } = await this.client.post(`/organization_exports`, {
                data: { organization: orgId },
            });
            return data;
        },
    };
}
exports.default = AsanaClient;
