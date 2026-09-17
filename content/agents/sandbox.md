---
title: "agents: running code"
date: 2026-09-15T00:00:00-06:00
description: An agent can write a script and run it. Here is exactly how far the sandbox goes, and where it stops.
url: /agents/sandbox
---

{{< agents-nav "sandbox" >}}

<p class="agents-hero">
Give an agent the <code>run_script</code> tool and it can write Node, Python, or
shell and run it. This is for work you want computed instead of estimated.
Arithmetic over a lot of numbers, reshaping a file, checking a pattern against
real input. It is not a box for code you have a reason to distrust.
</p>

## How safe is it

Safer than running it in the server process. Not as safe as a container.

A script gets its own process with an empty environment. None of
your keys, none of your secrets. It gets a private working directory, a wall
clock time limit, and a cap on how much it can print.

On Linux it also loses the network and gets a memory limit, if the kernel allows
it. On a Mac it gets neither. A Node script is held to an interpreter heap limit
and that is all.

What no host gets is a filesystem boundary. A script can still read whatever the
user running the server can read.

The important part is that it says so. The tool tells the model what it managed
on this machine, and the Tools page prints the same line for you. It does not
claim isolation it does not have.

## What can a script do on my machine

Ask the install instead of guessing from the operating system. What it locked
down is probed against the real kernel at startup, so the answer is different on
your laptop and on your server.

```bash
agent brief | grep -A2 run_script
# - **run_script** — Run a short program you wrote in a sandboxed subprocess...
#   on this host: node (node), python (python3), sh (bash); subprocess (isolation
#   from accidents, not from intent: this host has no namespaces); network NOT
#   blocked — this host cannot drop it; memory NOT capped — this host ignores the rlimit
```

The same line is on the Tools page, and over HTTP:

```bash
curl -s localhost:2137/api/tools/implementations \
  | jq '.[] | select(.name=="run_script") | .hostNote'
```

It reports three things:

- **Which languages exist here.** Node, Python 3, and a shell are looked for on
  `PATH`. The model is only offered the ones that were found.
- **Whether the network was taken away.** That needs Linux with
  unprivileged user namespaces. Anywhere else it says so.
- **Whether the memory cap is real.** A kernel rlimit on Linux, the interpreter's
  own heap limit for Node, and nothing at all on macOS, which ignores the rlimit.

Every run records it too. A `run_script` result carries a `sandbox` field with the
same sentence, so a run from six months ago still says what it was running under.

## Turning it on

Add `run_script` to an agent's tools, like any other tool. There is nothing else
to switch on. Out of the box it gets thirty seconds, a 512 MB memory cap, 64 KB
of output per stream, and no network.

```bash
curl -X POST localhost:2137/api/agents \
  -H 'content-type: application/json' \
  -d '{"name":"analyst","description":"Answers questions about data files",
       "systemPrompt":"Compute answers with a script rather than estimating them.",
       "tools":["read_file","run_script"]}'
```

The script runs in the run's own output directory, which is where `read_file` and
`write_file` already point. So it can read what an earlier step wrote, and
anything it leaves behind comes back attached to the run. A chart it drew shows up
as an image on the run page.

## Changing the limits, or pinning a language

The limits are deliberately not parameters the model can set. They live on a tool
definition, next to the description:

```bash
curl -X POST localhost:2137/api/tools \
  -H 'content-type: application/json' \
  -d '{"name":"run_python","implementation":"run_script",
       "description":"Run a Python script over the files in this run.",
       "parameterOverrides":{"language":"python","timeoutMs":120000,
                             "maxMemoryMb":2048,"maxOutputBytes":262144,
                             "network":false}}'
```

Then give the agent `run_python` instead of `run_script`. The Tools page does the
same thing without the curl.

- `language` pins one of `node`, `python`, `sh`. Pinned, it stops being a question
  the model answers. If that interpreter is not installed here, the tool refuses
  to build and names what is, rather than failing on the first call.
- `network: true` is the only way a script gets the network, and it means nothing
  on a host where the network could not be dropped in the first place.
- `timeoutMs`, `maxMemoryMb` and `maxOutputBytes` cap out at ten minutes, 8 GB,
  and 4 MB. A typo above the ceiling is rejected when the tool is built, not after
  a run has been parked for a day.

Two definitions can point at the same implementation with different limits. A
quick one for arithmetic, a longer one for a large file. Each is versioned.

## Turning it off

It is off until you ask for it. `run_script` only runs for an agent that lists it,
so there is no global switch to throw. Turning it off means taking it out of the
agents that have it. To find them:

```bash
curl -s localhost:2137/api/agents \
  | jq -r '.[] | select((.tools // []) | index("run_script")) | .name'
```

Then edit those agents and remove it, in the browser or with a `PUT`. That is a
save like any other, so the version that had it is still in the history.

If what you want is a stronger boundary rather than no scripts, isolate the
server. Run `agent serve` as its own user, or in a container, or on a machine you
do not mind it reading. A script cannot see your keys or call a model, but it can
read what the server's user can read, and no setting here changes that.

## Python is not in the list

Only what was found on `PATH` when the server started gets offered, and that
discovery happens once per process. Installing Python and expecting the running
server to notice will not work. Install it, then restart:

```bash
python3 --version   # make sure the server's PATH will find it
# restart agent serve, then:
agent brief | grep -A2 run_script
```

A `sh` that is there and a `python` that is not is the usual shape of this on a
slim container image.

{{< agents-pager "sandbox" >}}
