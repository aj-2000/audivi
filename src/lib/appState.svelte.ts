export class AppState {
	private static _instance: AppState | null = null;
	public inputFile: File | null = $state(null);

	private constructor() {}

	public static get instance(): AppState {
		if (this._instance === null) {
			this._instance = new AppState();
		}
		return this._instance;
	}
}
