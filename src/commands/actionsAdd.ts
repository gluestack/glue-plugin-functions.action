const prompts = require("prompts");
import { GlueStackPlugin } from "..";
import { PluginInstance } from "../PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { reWriteFile } from "../helpers/reWriteFile";
import { replaceSpecialChars } from "../helpers/replaceSpecialChars";
import { copyToTarget } from "../helpers/copyToTarget";

export function actionsAdd(program: any, glueStackPlugin: GlueStackPlugin) {
  program
    .command("actions:add")
    .description("Adds a graphql action")
    .argument(
      '<action-name>',
      'name of the action to be added'
		)
    .action(async (actionName: string) => handler(glueStackPlugin, actionName));
}

export const writeAction = async (pluginInstance: PluginInstance, actionName: string) => {
  await copyToTarget(`${pluginInstance.callerPlugin.getActionTemplateFolderPath()}`, `${pluginInstance.getInstallationPath()}/actions/${actionName}`);
  const actionGQLfile = `${pluginInstance.getInstallationPath()}/actions/${actionName}/action.graphql`;
  await reWriteFile(actionGQLfile, replaceSpecialChars(actionName), 'actionName');
};

async function selectInstance(pluginInstances: IInstance[]) {
  const choices = pluginInstances.map((instance: PluginInstance) => {
    return {
      title: instance.getName(),
      description: `Select ${instance.getName()} instance`,
      value: instance,
    };
  });
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select an instance",
    choices: choices,
  });

  return value;
}

export async function handler(glueStackPlugin: GlueStackPlugin, actionName: string) {
  if (glueStackPlugin.getInstances().length) {
    const instance = await selectInstance(glueStackPlugin.getInstances());
    if (instance) {
      await writeAction(instance, actionName);
    }
  } else {
    console.error("No functions.action instances found");
  }
}
