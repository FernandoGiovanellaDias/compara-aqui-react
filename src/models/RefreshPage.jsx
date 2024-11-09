export default class RefreshPage {
    loading = false;
    error = false;
    msg = null;
    reload = null;

    constructor(dados) {
        this.loading = dados?.loading ?? false;
        this.error = dados?.error ?? false;
        this.msg = dados?.msg ?? null;
        this.reload = dados?.reload ?? null;
    }


}