import { Mutation, RegisterOptions, VuexModule } from 'vuex-class-modules';
import { cloneDeep } from '@/common/utils/GeneralUtils';

interface ExtendedRegisterOptions<T> extends RegisterOptions {
  state: T;
}

abstract class ExtendedVuexModule<T> extends VuexModule {
  private readonly initialState: T;

  constructor({ state, ...options }: ExtendedRegisterOptions<T>) {
    super(options);

    this.initialState = state;
    this.resetState();
  }

  @Mutation
  resetState(): void {
    Object.assign(this, cloneDeep(this.initialState));
  }
}

export default ExtendedVuexModule;
