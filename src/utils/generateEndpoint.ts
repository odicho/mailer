/* 

    Author: Amanuel Odicho

    A simple CLI program to help scaffold files for a new endpoint!

*/

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

const error = chalk.bold.red;

const program = new Command();

program.command('generate').action(async () => {
	let endpointName;
	let dirPath;

	for (;;) {
		const answers = await inquirer.prompt([
			{
				name: 'endpoint',
				message: 'Enter the endpoint name:',
				type: 'input',
			},
		]);

		endpointName = answers.endpoint;
		if (!isKebabCase(endpointName)) {
			console.log(error(`${endpointName} is an invalid endpoint name: kebab-case is required\n`));
			continue;
		}
		dirPath = path.join('src', 'api', endpointName);

		// Check if directory already exists
		if (fs.existsSync(dirPath)) {
			console.log(error(`${endpointName} already exists!\n`));
			continue;
		}

		break;
	}

	// Create directory for the new endpoint
	fs.mkdirSync(dirPath, { recursive: true });

	const endpointNameCamel = toCamelCase(endpointName);
	const endpointNamePascal = toPascalCase(endpointName);

	// Define file templates
	const controllerTemplate = getControllerFileContent(endpointNamePascal);
	const routesTemplate = getRoutesFileContent(endpointNamePascal, endpointNameCamel);
	const serviceTemplate = getServiceFileContent(endpointNamePascal);
	const indexTemplate = getIndexFileContent(endpointNameCamel);
	const routeTemplate = getRegisterRoutesFileContent(endpointNameCamel, endpointName);
	const importStatement = getRoutesImportStatement(endpointNameCamel, endpointName);

	// Find correct position to insert new route in src/routes.ts
	const routeFilePath = path.join('src', 'utils', 'routes.ts');
	let fileContent = fs.readFileSync(routeFilePath, 'utf8');

	// Find where the last import ends
	const lastImportIndex = fileContent.lastIndexOf('import');

	// Check if lastImportIndex is valid
	if (lastImportIndex !== -1) {
		// Find the end of the line after the last import
		const lastImportEndIndex = fileContent.indexOf('\n', lastImportIndex);

		// Insert the new import after the last existing one
		fileContent =
			fileContent.slice(0, lastImportEndIndex + 1) +
			importStatement +
			fileContent.slice(lastImportEndIndex + 1);
	}

	const functionEndIndex = fileContent.lastIndexOf('}');

	// Not really needed, just safetyguard
	if (functionEndIndex !== -1) {
		// Insert the new route at the end of the registerRoutes function
		fileContent =
			fileContent.slice(0, functionEndIndex) + routeTemplate + fileContent.slice(functionEndIndex);

		// Rewrite the file
		fs.writeFileSync(routeFilePath, fileContent);
	}

	// Write templates to files
	fs.writeFileSync(path.join(dirPath, `${endpointNameCamel}.controller.ts`), controllerTemplate);
	fs.writeFileSync(path.join(dirPath, `${endpointNameCamel}.routes.ts`), routesTemplate);
	fs.writeFileSync(path.join(dirPath, `${endpointNameCamel}.service.ts`), serviceTemplate);
	fs.writeFileSync(path.join(dirPath, 'index.ts'), indexTemplate);

	console.log('Files generated successfully');
});

program.parse(process.argv);

function getControllerFileContent(endpointNamePascal: string) {
	return `import type { FastifyReply, FastifyRequest } from 'fastify';
import { get${endpointNamePascal}, post${endpointNamePascal} } from './';
import { getError } from '../../utils/getError';

export async function get${endpointNamePascal}Handler(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const response = await get${endpointNamePascal}(id);

        return reply.code(200).send(response);
    } catch (error) {
        const { statusCode, message } = getError(error);
        return reply.code(statusCode).send(message);
    }
}

export async function post${endpointNamePascal}Handler(
    request: FastifyRequest<{ Body: { example: string } }>,
    reply: FastifyReply
) {
    try {
        const { example } = request.body;
        const data = await post${endpointNamePascal}(example);

        return reply.code(200).send(data);
    } catch (error) {
        const { statusCode, message } = getError(error);
        return reply.code(statusCode).send(message);
    }
}
`;
}

function getRoutesFileContent(endpointNamePascal: string, endpointNameCamel: string) {
	return `import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { get${endpointNamePascal}Handler, post${endpointNamePascal}Handler } from './';
    
export function ${endpointNameCamel}Routes(
    app: FastifyInstance,
    _: FastifyPluginOptions,
    done: () => void
) {
    app.get('/:id', get${endpointNamePascal}Handler);
    app.post('/', post${endpointNamePascal}Handler);
    
    done();
}
`;
}

function getServiceFileContent(endpointNamePascal: string) {
	return `export async function get${endpointNamePascal}(id: number) {
    // e.g. query db here

    return id;
}

export async function post${endpointNamePascal}(example: string) {
    // e.g. insert to db here

    return example;
}
`;
}

function getIndexFileContent(endpointNameCamel: string) {
	return `export * from './${endpointNameCamel}.controller';
export * from './${endpointNameCamel}.routes';
export * from './${endpointNameCamel}.service';
`;
}

function getRegisterRoutesFileContent(endpointNameCamel: string, endpointName: string) {
	return `
    app.register(${endpointNameCamel}Routes, {
        prefix: 'uxr-cal/${endpointName}',
    });
`;
}

function getRoutesImportStatement(endpointNameCamel: string, endpointName: string) {
	return `import { ${endpointNameCamel}Routes } from '../api/${endpointName}';\n`;
}

function toCamelCase(str: string) {
	return str.replace(/-([a-z])/g, (g) => {
		return g[1].toUpperCase();
	});
}

function toPascalCase(str: string) {
	const camelCase = toCamelCase(str);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

function isKebabCase(str: string) {
	const kebabCaseRegex = /^[a-z]+(-[a-z]+)*$/;
	return kebabCaseRegex.test(str);
}

process.on('SIGINT', () => {
	console.log(chalk.blue('\nBye bye!'));
	process.exit();
});
