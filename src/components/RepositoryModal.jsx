import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import CollapsableCard from "./CollapsableCard";
import DescriptiveFormGroup from "./DescriptiveFormGroup";

export default function RepositoryModal(props) {

    const [show, setShow] = useState(props.show);
    const [repo, setRepo] = useState(props.repo);
    const GeneralInfo = [
        { "Allow Forking:": repo.allow_forking },
        { "Archived:": repo.archived },
        { "Creation Date:": repo.created_at },
        { "Description:": repo.description },
        { "Disabled:": repo.disabled },
        { "Fork:": repo.fork },
        { "Forks:": repo.forks },
        { "Full Name:": repo.full_name },
        { "Has Pages:": repo.has_pages },
        { "Id:": repo.id },
        { "Language:": repo.language },
        { "License:": repo.license },
        { "Name:": repo.name },
        { "Node Id:": repo.node_id },
        { "Open Issues:": repo.open_issues },
        { "Open Issues Count:": repo.open_issues_count },
        { "Owner:": repo.owner.login },
        { "Private:": repo.private },
        { "Pushed At:": repo.pushed_at },
        { "Size:": repo.size },
        { "Stars:": repo.stargazers_count },
        { "Topics:": repo.topics },
        { "Updated At:": repo.updated_at },
        { "Visibility:": repo.visibility },
        { "Watchers:": repo.watchers },
        { "Watchers Count:": repo.watchers_count }
    ];

    const LinksInfo = [
        { "Archive Url:": repo.archive_url },
        { "Assignees Url:": repo.assignees_url },
        { "Blobs Url:": repo.blobs_url },
        { "Branches Url:": repo.branches_url },
        { "Clone Url:": repo.clone_url },
        { "Collaborators Url:": repo.collaborators_url },
        { "Deployments Url:": repo.deployments_url },
        { "Downloads Url:": repo.downloads_url },
        { "Events Url:": repo.events_url },
        { "Forks Url:": repo.forks_url },
        { "Git Commits Url:": repo.git_commits_url },
        { "Git Refs Url:": repo.git_refs_url },
        { "Git Tags Url:": repo.git_tags_url },
        { "Git Url:": repo.git_url },
        { "Homepage Url:": repo.homepage },
        { "Hooks Url:": repo.hooks_url },
        { "Html Url:": repo.html_url },
        { "Issue Comment Url:": repo.issue_comment_url },
        { "Issues Events Url:": repo.issue_events_url },
        { "Issues Url:": repo.issues_url },
        { "Keys Url:": repo.keys_url },
        { "Labels Url:": repo.labels_url },
        { "Languages Url:": repo.languages_url },
        { "Merges Url:": repo.merges_url },
        { "Milestones Url:": repo.milestones_url },
        { "Pulls Url:": repo.pulls_url },
        { "Realeases Url:": repo.releases_url },
        { "Ssh Url:": repo.ssh_url },
        { "Stargazers Url:": repo.stargazers_url },
        { "Statuses Url:": repo.statuses_url },
        { "Subscribers Url:": repo.subscribers_url },
        { "Subscription Url:": repo.subscription_url },
        { "Svn Url:": repo.svn_url },
        { "Tags Url:": repo.tags_url },
        { "Teams Url:": repo.teams_url },
        { "Trees Url:": repo.trees_url },
        { "Url:": repo.url }
    ];

    useEffect(() => {
        setShow(props.show);
        setRepo(props.repo);
    }, [props]);

    return (
        <Modal scrollable size="xl" backdrop="static" show={show} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                <Modal.Title>"{repo.name}" Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CollapsableCard id="modalGeneral" expanded={true} title="General" border="secondary">
                    <Form as={Container} fluid className="p-3">
                        {
                            GeneralInfo.map((info, i) => (
                                <DescriptiveFormGroup key={i} label={Object.keys(info)[0]} value={info[Object.keys(info)[0]]} />
                            ))
                        }
                    </Form>
                </CollapsableCard>

                <CollapsableCard id="modalLinks" expanded={true} title="Urls" border="secondary">
                    <Form as={Container} fluid className="p-3">
                        {
                            LinksInfo.map((link, i) => (
                                <DescriptiveFormGroup key={i} label={Object.keys(link)[0]} value={link[Object.keys(link)[0]]} />
                            ))
                        }
                    </Form>
                </CollapsableCard>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => props.setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}