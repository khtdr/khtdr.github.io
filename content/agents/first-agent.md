---
title: "agents: your first agent"
date: 2026-09-17T00:00:00-06:00
description: Describe one agent and let the install draft it, run it on a repository from the terminal and the browser, read the run back in history, then edit it in the browser. The first of three tutorials.
url: /agents/first-agent
---

{{< agents-nav "first-agent" >}}

<style>
.tut-series {
  font-family: "Reddit Mono", monospace;
  font-size: 0.82rem;
  color: var(--muted-color);
  margin: 0 0 14px;
}
.tut-series a { color: var(--muted-color); }
.tut-note {
  background-color: var(--well-color);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--accent-color);
  border-radius: 6px;
  padding: 10px 14px;
  margin: 16px 0 22px;
  font-size: 0.92rem;
}
.tut-note p { margin: 0; }
.tut-note p + p { margin-top: 8px; }
.tut-next {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 18px 0 8px;
}
.tut-next > * {
  flex: 1 1 220px;
  background-color: var(--well-color);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.92rem;
}
.tut-next h4 { margin: 0 0 4px; font-size: 1rem; }
.tut-next p { margin: 0; }
</style>

<p class="tut-series">Tutorial 1 of 3 · next: a pipeline (coming soon)</p>

By the end of this page you will have made one agent from a description, watched
it call a tool, and read the whole run back afterwards: what it cost, what it asked the
tool, which version of the agent produced it. The agent reads a repository's
recent commits and writes release notes. It is small on purpose. The next two
tutorials build on it, so its name and its job are settled here.

## Before you start

You need a running install and nothing else. Follow the
[install steps in Getting started](/agents/start), which come down to:

```bash
npm install -g @upship/agents
agent serve
```

The first start asks for an [OpenRouter](https://openrouter.ai) key and writes it
to `~/.agents/.env`. That key is the only setup this page needs. Once it is
running, stop it with Ctrl-C and start it again in the background, so this page
fits in one terminal:

```bash
agent start
```

That prints the address it is on, and `agent open` opens the web UI in a
browser. It is [localhost:2137](http://localhost:2137) unless you chose a port.
The page ends with `agent stop`.

No checkout, no Postgres, no secrets. Node 24 or later, and `git` on your path.

## 1. The agent

You do not write the agent. You describe it, and the install drafts it:

```bash
agent new
```

It asks what you want to build. Take a few lines, then a blank line to finish.
Say this, or something close to it, and keep the name, because the next two
tutorials use it:

```text
An agent called changelog-writer. Its input names a git repository, either a
path or `.` for the directory the run was started in. It reads the last 40
commits with git_log and writes release notes in markdown: commits grouped
under Added, Changed and Fixed, one plain-language bullet per change, no
hashes, and merge commits and version bumps left out. It returns only the
notes.
```

It may ask a question or two back, about anything you left open. A short
answer is enough. Then it shows the draft:

```text
╭─ draft ────────────────────────────────────────────────
│ Name:  changelog-writer
│ What:  Turns a repository's recent commits into release notes
│ Model: default
│ Tools: git_log
│
│ System prompt
│ You write release notes for developers. ...
│
│ Notes
│ Chose the default tier: the notes are prose, not a decision. ...
╰────────────────────────────────────────────────────────
Create it? [y/N]
```

Read it before you answer. The four lines at the top are the agent, apart from
the prompt under them:

- **Name** is how you run it, from the CLI, the API, and later from other
  agents. Lowercase, with dashes.
- **What** is a one-line description, for the agents list and for other agents
  deciding whether to call it.
- **Model** is a tier: `fast`, `default`, or `reasoning`. The agent asks for a
  tier, and the Models page decides which model that means. A fresh install
  points `default` at Claude Sonnet.
- **Tools** is a list of names. This one gets `git_log`, which lists a
  repository's commits as structured data. It needs no configuration, which is
  why it is the tool on the first page. It can only open a repository in a
  directory the install allows, and you will see that refusal later on.

The prompt is the job, written as instructions to the model: where the input
comes from, which tool to reach for, and what the output should look like.
**Notes** is the drafter explaining what it decided on its own. If
the draft has a different name or no `git_log` on the Tools line, answer `n`
and run `agent new` again with the description above word for word.

Answer `y`. The agent now exists at version `0.1.0`, and `agent list` shows it.
Nothing about it is code. It is a row with those five fields, and everything
this page does with it later, running it, reading it back, editing it, works on
the row.

## 2. The repository

The agent reads a repository, so pick one you already have. Your own is the more
convincing test, since you know what the commits meant.

Tools that touch the disk see only the directories the install allows. On a
fresh install that is the install's own data directory, `~/.agents/data`, plus
the usual places projects live, `~/code`, `~/projects`, `~/src`, and a few
others, whichever of them existed when the install was set up. Go to the
repository and check:

```bash
cd ~/code/myproject
agent add-data-dir .
```

If the directory is already under an allowed one, it says so and nothing
changes. Otherwise it adds the directory to the list, prints the whole list, and
tells you to run `agent restart`, because the server reads the list when it
starts. That list is everything any agent on this install can read, which is
worth knowing before you run one.

## 3. The first run

Run it from the terminal first, from inside the repository:

```bash
cd ~/code/myproject
agent changelog-writer .
```

The CLI tells the run which directory it was started in, so `.` means this
repository, the same as it would for `git log`. A line appears when the model
calls the tool, the notes stream in under it, and the last line reports the run:

```text
│ ⚡ git_log {"repo":".","maxCount":40}
│
╰─ ✓ 2 steps · 6.8s · 2,140 tokens · 3f1c9a2e
```

Two steps is the tool call and the answer. The eight characters at the end are
the start of the run id, which is how you find this run in history. This is how
you will run it when the input comes from a script rather than from you.

Now run it from the browser, which shows more while it happens. Open the web
UI with `agent open`, click the agent in **All Agents**, and click **Run**. That
is the Playground: an input box, a Run button, and a
stream of what happens. The browser was not started anywhere in particular, so
give it the path in full, `~/code/myproject` spelled out, and run. Watch the
step list fill in:

1. A tool call, `git_log`, with the path and `"maxCount": 40`. The model decided
   to make that call and chose those arguments. Nobody scripted the step. The
   prompt said what the input names and the tool's own description said what it
   does.
2. The tool result: the path the repository resolved to and a list of commits,
   each with its hash, author, date, and subject. The terminal did not show
   this part.
3. The release notes, streamed as they are written.

<div class="tut-note">
<p><strong>Try to read something you should not.</strong> Run it once more, and
this time give it <code>/etc</code>. The model asks <code>git_log</code> for that
path, and the tool refuses:</p>
<p><code>Path "/etc" is outside the allowed directories "/home/you/.agents/data", "/home/you/code".</code></p>
<p>The run ends as an error, and the message names the directories it was held
to. Every tool that touches the disk goes through the same check, so no agent on
this install can wander the machine, whatever its prompt says. Nor can the CLI
talk it into more: <code>cd /etc && agent changelog-writer .</code> runs, but
against the data directory, with a note saying so. The git tools go one step
further and ask git where the repository's working tree and <code>.git</code>
directory are, then check those too, so a repository that reaches outside the
allowed directories is refused as well.</p>
</div>

## 4. The run in history

Open **Run History**. The runs you just made are at the top, each with its status,
tokens, cost, and duration. Click the first one.

The run page starts with a row of numbers: duration, steps, the model it ran on,
tokens, and cost. Two of these deserve a sentence.

- **Model** is the model the run used, not the tier the agent asked for. The
  agent said `default`. The run records which model `default` meant at the time,
  so if you repoint the tier next month, old runs still say what they ran on.
- **Cost** comes from the token counts and the price on file for that model.
  Prices live on the Models page, and a model with no price shows as unpriced
  rather than as free. It is tracked in microdollars, so a run that cost a
  fraction of a cent still has a number.

Under the numbers is the step list, the same one the Playground streamed, now
kept. Each tool call is paired with its result, so you can open the `git_log`
call and see both the arguments the model chose and what came back:

```json
{
  "repo": "/home/you/code/myproject",
  "commits": [
    {
      "hash": "b08f5fda6772b6bb6efa4e5ebd950edaf8d7155c",
      "shortHash": "b08f5fd",
      "author": "Joey Mazzarelli",
      "email": "joey@example.com",
      "date": "2026-09-17T11:42:24-06:00",
      "subject": "Git as a closed set of verbs over a repo the file scope can see",
      "body": "..."
    }
  ]
}
```

The commits come back as objects rather than as text, which matters later: a
pipeline step can pick out `commits[0].hash` without parsing anything. Then the
answer, with its own token count. The token counts on the steps add up to the
total at the top.

At the bottom, the run names the agent **version** that produced it, as a short
id. Right now there is only one version. That changes in the next step.

Scroll down and find the failed run too. Its status is an error and its output is
the refusal from the tool. A failure is recorded the same way a success is, with
the same fields, which is what makes it possible to find out later what went
wrong.

## 5. Edit the prompt and run again

The agent was made from the terminal. It is edited in the browser, where the
prompt is a text box rather than a draft to accept or refuse. Open the agent
in **All Agents** and click **Edit**. Add one line to the end of the system prompt:

```text
Start with a one-sentence summary of the release before the headings.
```

Click **Save**. The agent is now version `0.1.1`. Nothing was rebuilt or restarted. The next
run picks up the new prompt because the prompt is a field on a row and the run
reads the row.

Run it again, from either place. The output now opens with a
summary line. Then look at two things:

- **Version History** on the agent page lists both versions with the time each
  was saved. Expand one to see the prompt it carried. Every save adds a version.
  There is no way to save without one.
- **The new run in history** names the second version, and the earlier runs
  still name the first. Each entry in Version History shows the same short id
  the run page shows, so matching them is a glance. A run knows which version of
  its agent produced it, and when an output changes you can see whether the
  prompt did.

That pairing is what makes A/B testing a prompt a matter of looking rather than
remembering. The run page can also replay a run against a different version on
the same input, which is the tool for comparing two prompts directly. It is one
click and is not walked here.

## Now your turn

The agent always reads the last 40 commits, so running it twice writes notes
for the same commits twice. A release is really everything since the last
release. Make the agent remember where it stopped.

The platform has a [durable memory](/agents/features#memory) for exactly this: a
few named values that outlive the run, kept under a namespace, with tools to
read and write them. Some hints, in the order you would hit them:

- **Memory tools need a namespace.** Unlike `git_log`, `memory_get` and
  `memory_set` cannot be toggled on as they are. Each is used through a tool
  definition that carries the namespace it reads and writes. Open **Tools**,
  click **New Tool Definition**, pick `memory_get` as the implementation, and
  put `{"namespace": "changelog-writer"}` in the config. Make a second one for
  `memory_set` with the same namespace. Their names are yours to choose.
- **Give the agent both**, in the browser, the same way you added the summary
  line. The Tools list on the edit page shows your definitions beside the
  built-in tools.
- **Change the prompt** so the first thing the model does is read a key, say
  `last-hash`. If nothing is found, that is the first run, and 40 commits is a
  fine answer. If a hash comes back, the notes cover only the commits newer
  than it. `git_log` has no "since this hash" parameter, so either ask for more
  commits and stop at the remembered one, or remember the date of the newest
  commit as well and pass it as `since`.
- **Write the new watermark last**, after the notes are done, and only if there
  was something new. Pass the old value as `expected` so two runs started at
  once cannot overwrite each other. The tool's description explains that
  refusal and what to do about it.

Then run it twice and open **Memory**, in the sidebar of the Tools section. The key is there, with the
run that wrote it and when. Run it a third time after a commit and the notes
should be one bullet long. If you want to start over, forget the key on that
page. Only a person can, by design, so a run can never mistake a cleared memory
for a first run of its own doing.

When you are done, stop the server:

```bash
agent stop
```

Everything you made stays in `~/.agents`: the agent, its two versions, the runs,
and whatever it remembered. `agent start` brings it all back for tutorial 2.

<div class="tut-next">
<div>
<h4>Next: a pipeline</h4>
<p>Coming soon. The changelog writer becomes a node in a graph, with a search before it, a file written after it, and a gate that sends bad work back.</p>
</div>
<div>
<h4>Back to the overview</h4>
<p><a href="/agents">What the platform does</a> and the <a href="/agents/features">full feature list</a>.</p>
</div>
</div>

{{< agents-pager "first-agent" >}}
