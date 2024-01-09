import styles from "./List.module.css";
import Accordion from "react-bootstrap/Accordion";
import {ProjectItem} from "./ProjectItem";
import {useCallback, useEffect, useState} from "react";
import {Project} from "../background_script/fetchProjects";

export const List = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	const fetchProjects = useCallback(() => {
		chrome.storage.local.get(["projects"], (result) => {
			console.log(result.projects);
			setProjects(result.projects || []);
		});
		chrome.storage.local.set({ unReadProjectsCount: 0 })
		chrome.action.setBadgeText({text: ``}); 
	}, []);

	useEffect(() => {
		fetchProjects();
		const timeout = setInterval(() => {
			fetchProjects();
		}, 1000);

		return () => clearInterval(timeout);
	}, [fetchProjects]);

	return (
		<div className={styles.list}>
			<Accordion data-bs-theme="dark">
				{projects.map((project, index) => (
					<ProjectItem
						project={project}
						eventKey={index.toString()}
						key={index.toString()}
					/>
				))}
			</Accordion>
		</div>
	);
};
