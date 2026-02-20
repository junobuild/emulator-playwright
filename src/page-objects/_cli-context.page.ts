const JUNO_CLI = {command: 'juno', args: []};

const JUNO_TEST_ARGS = ['--mode', 'development', '--headless'];

export interface CliContextPageParams {
  command?: {command: string; args: string[]};
}

export abstract class CliContextPage {
  protected readonly command: string;
  protected readonly commandArgs: string[];

  protected constructor({command}: CliContextPageParams) {
    const {command: cmd, args} = command ?? JUNO_CLI;

    this.command = cmd;
    this.commandArgs = args;
  }

  protected buildArgs(args: string[]): string[] {
    return [...this.commandArgs, ...args, ...JUNO_TEST_ARGS];
  }
}
